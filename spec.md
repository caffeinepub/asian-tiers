# Asian Tiers

## Current State
- Gamemodes: Overall, Mace, UHC, Sword, Axe, SMP, Crystal, Pot, Neth Pot, Tank (Bed already removed)
- Tiers in Submit Player form: LT5, HT5, LT4, HT4, LT3, HT3, LT2, HT2, LT1, HT1
- Backend Tier enum: HT1–HT5, LT1–LT5 (10 tiers)
- Gamemode icons: Using Lucide icons (Hammer for Mace, Heart for UHC, Sword for Sword, Axe for Axe, Home for SMP, Zap for Crystal, FlaskConical for Pot, Flame for Neth Pot, Shield for Tank)
- Theme: Already dark/black but can be enhanced
- TierEmblem: SVG hexagon emblems for HT/LT tiers
- TierFilterPills: Shows HT5, HT4, HT3, HT2, HT1, LT5, LT4, LT3, LT2, LT1
- AdminPanel: TIERS array with HT1-HT5, LT1-LT5

## Requested Changes (Diff)

### Add
- New tiers in Submit Player dropdown: LT3, LT3+, LT2, LT2+, LT1, LT1+, M1, M2, M3, M4, M5, Combat Master, Grandmaster
- Combat Master and Grandmaster tiers to TierFilterPills (as display-only filter options from submissions)
- High-tier labels: Combat Master and Grandmaster should appear in filters and player profile when applicable
- Better MC-style gamemode icons matching mctiers.com style (custom SVG icons for each gamemode)

### Modify
- Submit Player tier dropdown: Replace current LT5/HT5 list with: LT3, LT3+, LT2, LT2+, LT1, LT1+, M1, M2, M3, M4, M5, Combat Master, Grandmaster
- GamemodeTabs: Replace Lucide icons with custom MC-style SVG icons matching mctiers visual style
- GamemodeTabs: Rename "Neth Pot" to "Netherpot" to match mctiers naming
- Theme: Pure black/deep dark backgrounds (oklch values closer to true black), no purple tints
- PlayerCard: Remove Bed from gamemodeColors map (already mostly done)
- TierFilterPills: Add Combat Master and Grandmaster pills (styled distinctly as high prestige)
- TierEmblem + TierFilterPills + AdminPanel: Add CombatMaster and Grandmaster colors/labels
- index.css: Deepen background toward pure black

### Remove
- Any remaining reference to "Bed" gamemode (check PlayerCard gamemodeColors)
- Old SUBMISSION_TIERS list (replace with new tiers per request)

## Implementation Plan
1. Update GamemodeTabs: replace Lucide icons with inline SVG custom MC-style icons, rename Neth Pot → Netherpot
2. Update SubmitPlayerModal: Replace SUBMISSION_TIERS with LT3, LT3+, LT2, LT2+, LT1, LT1+, M1, M2, M3, M4, M5, Combat Master, Grandmaster
3. Update TierEmblem: Add CombatMaster and Grandmaster tier colors/labels (as string literal types since they are not in the backend Tier enum - these are submission-only tiers)
4. Update TierFilterPills: Add Combat Master and Grandmaster pills for filtering submitted players by self-reported tier
5. Update PlayerCard: Remove Bed from gamemodeColors
6. Update index.css: Deepen background to pure black
7. Note: Combat Master and Grandmaster are submission self-report tiers only (submissionTier string field), not backend Tier enum values - they won't appear in player rankings but will show in submission table and filter
