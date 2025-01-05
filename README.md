Section: Both from Section B, Questions 6 and 8

Endpoint 1: POST /spells/:spell_id/user/:user_id/redeem
Description:
Users can redeem spells, with middleware checking if they have enough skill points and don’t already own the spell.

400: Insufficient points
409: User already owns the spell
404: User or spell not found
201: Success, redeeming the spell updates the UserSpells table and deducts skill points.


Endpoint 2: POST /user/:user1_id/spellsUsed1/:spell1_id/user/:user2_id/spellUsed2/:spell2_id/battle
Description:
Users can battle by choosing spells. The middleware checks if they own the spells.

403: User doesn’t own the spell
409: Tie (same spell)
404: Winner doesn’t have a house
201: Winner is announced, house points updated.
