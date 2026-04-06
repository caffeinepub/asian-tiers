import Time "mo:core/Time";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";




actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Player Tier Rankings System
  type Tier = {
    #HT5;
    #HT4;
    #HT3;
    #HT2;
    #HT1;
    #LT5;
    #LT4;
    #LT3;
    #LT2;
    #LT1;
  };

  type PlayerId = Nat;
  type SubmissionId = Nat;
  type Gamemode = Text;

  type Player = {
    id : PlayerId;
    name : Text;
    discordUsername : Text;
    region : Text;
    gamemode : Gamemode;
    tier : Tier;
    notes : Text;
    createdAt : Time.Time;
  };

  type PlayerDTO = Player;

  module Player {
    public func compare(p1 : Player, p2 : Player) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  // Legacy submission type (no submissionTier) - kept for stable var compatibility
  type PlayerSubmissionV1 = {
    id : SubmissionId;
    name : Text;
    discordUsername : Text;
    region : Text;
    gamemode : Gamemode;
    submittedAt : Time.Time;
  };

  // Current submission type with submissionTier
  type PlayerSubmission = {
    id : SubmissionId;
    name : Text;
    discordUsername : Text;
    region : Text;
    gamemode : Gamemode;
    submissionTier : Text;
    submittedAt : Time.Time;
  };

  let players = Map.empty<PlayerId, Player>();
  var nextPlayerId : PlayerId = 1;
  var nextSubmissionId : SubmissionId = 1;

  // Legacy stable var - preserves old submissions from before the migration
  let submissions : Map.Map<SubmissionId, PlayerSubmissionV1> = Map.empty<SubmissionId, PlayerSubmissionV1>();

  // New stable var - holds submissions that include submissionTier
  let submissionsV2 = Map.empty<SubmissionId, PlayerSubmission>();

  func getNextPlayerId() : PlayerId {
    let id = nextPlayerId;
    nextPlayerId += 1;
    id;
  };

  func getNextSubmissionId() : SubmissionId {
    let id = nextSubmissionId;
    nextSubmissionId += 1;
    id;
  };

  func findPlayer(id : PlayerId) : Player {
    switch (players.get(id)) {
      case (null) { Runtime.trap("Player not found") };
      case (?player) { player };
    };
  };

  func upgradeV1(sub : PlayerSubmissionV1) : PlayerSubmission {
    {
      id = sub.id;
      name = sub.name;
      discordUsername = sub.discordUsername;
      region = sub.region;
      gamemode = sub.gamemode;
      submissionTier = "";
      submittedAt = sub.submittedAt;
    }
  };

  func compareSubmissions(s1 : PlayerSubmission, s2 : PlayerSubmission) : Order.Order {
    Nat.compare(s1.id, s2.id);
  };

  func findSubmission(id : SubmissionId) : PlayerSubmission {
    switch (submissionsV2.get(id)) {
      case (?sub) { sub };
      case (null) {
        switch (submissions.get(id)) {
          case (null) { Runtime.trap("Submission not found") };
          case (?sub) { upgradeV1(sub) };
        };
      };
    };
  };

  // Returns all submissions (legacy + new) as the current type, sorted by id
  func allSubmissions() : [PlayerSubmission] {
    let legacy = submissions.values().toArray().map(upgradeV1);
    let newer = submissionsV2.values().toArray();
    legacy.concat(newer).sort(compareSubmissions);
  };

  public shared ({ caller }) func createPlayer(player : PlayerDTO) : async Player {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create players");
    };

    let id = getNextPlayerId();
    let newPlayer : Player = {
      player with
      id;
      createdAt = Time.now();
    };
    players.add(id, newPlayer);
    newPlayer;
  };

  public shared ({ caller }) func updatePlayer(id : PlayerId, player : PlayerDTO) : async Player {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update players");
    };

    let existing = findPlayer(id);
    let updatedPlayer : Player = {
      player with
      createdAt = existing.createdAt;
    };

    players.add(id, updatedPlayer);
    updatedPlayer;
  };

  public shared ({ caller }) func deletePlayer(id : PlayerId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete players");
    };
    ignore findPlayer(id);
    players.remove(id);
  };

  public query ({ caller }) func getAllPlayers() : async [Player] {
    players.values().toArray().sort();
  };

  public query ({ caller }) func getPlayersByGamemode(gamemode : Gamemode) : async [Player] {
    players.values().toArray().filter(func(p) { p.gamemode == gamemode }).sort();
  };

  public query ({ caller }) func getPlayersByName(searchTerm : Text) : async [Player] {
    let termLower = searchTerm.toLower();
    players.values().toArray().filter(func(p) { p.name.toLower().contains(#text termLower) }).sort();
  };

  public query ({ caller }) func getPlayersByTier(tier : Tier) : async [Player] {
    players.values().toArray().filter(func(p) { p.tier == tier }).sort();
  };

  public query ({ caller }) func getPlayersByRegion(region : Text) : async [Player] {
    players.values().toArray().filter(func(p) { p.region == region }).sort();
  };

  public shared ({ caller }) func submitPlayer(name : Text, discordUsername : Text, region : Text, gamemode : Gamemode, submissionTier : Text) : async () {
    let id = getNextSubmissionId();
    let submission : PlayerSubmission = {
      id;
      name;
      discordUsername;
      region;
      gamemode;
      submissionTier;
      submittedAt = Time.now();
    };
    submissionsV2.add(id, submission);
  };

  public query ({ caller }) func getPendingSubmissions() : async [PlayerSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view pending submissions");
    };
    allSubmissions();
  };

  public shared ({ caller }) func approveSubmission(submissionId : SubmissionId, tier : Tier, notes : Text) : async Player {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can approve submissions");
    };

    let submission = findSubmission(submissionId);
    let id = getNextPlayerId();
    let newPlayer : Player = {
      id;
      name = submission.name;
      discordUsername = submission.discordUsername;
      region = submission.region;
      tier;
      notes;
      gamemode = submission.gamemode;
      createdAt = Time.now();
    };

    players.add(id, newPlayer);
    // Remove from whichever store it came from
    submissions.remove(submissionId);
    submissionsV2.remove(submissionId);
    newPlayer;
  };

  public shared ({ caller }) func rejectSubmission(submissionId : SubmissionId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reject submissions");
    };
    submissions.remove(submissionId);
    submissionsV2.remove(submissionId);
  };
};
