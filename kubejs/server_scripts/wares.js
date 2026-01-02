// Wares Integration - Territory expansion from trades

if (typeof WaresEvents !== 'undefined') {
  WaresEvents.batchDelivered(function (event) {
    if (!global.ChunkTerritory || !global.ChunkTerritory.claimAdjacent) return;

    var blockEntity = event.getBlockEntity();
    var territoryTicks = 0;
    try {
      var itemStack = blockEntity.getAgreementItem();
      var tag = itemStack.getNbt ? itemStack.getNbt() : (itemStack.getTag ? itemStack.getTag() : null);
      if (tag && tag.contains && tag.contains('territoryExpandTime')) {
        territoryTicks = tag.getInt('territoryExpandTime');
      }
    } catch (e) {}

    if (territoryTicks <= 0) return;

    var player = event.getPlayer();
    var pos = blockEntity.getBlockPos();
    var server = blockEntity.getLevel().getServer();
    var bx = pos.getX() + 0.5, by = pos.getY(), bz = pos.getZ() + 0.5;

    var targetPlayer = player;
    if (!targetPlayer) {
      var players = server.players;
      var bestDist = Infinity;
      for (var i = 0; i < players.size(); i++) {
        var p = players.get(i);
        var dx = p.x - bx, dz = p.z - bz;
        var dist = dx * dx + dz * dz;
        if (dist < bestDist) {
          bestDist = dist;
          targetPlayer = p;
        }
      }
    }

    if (targetPlayer) {
      global.ChunkTerritory.claimAdjacent(
        server,
        targetPlayer.uuid.toString(),
        bx, by, bz,
        territoryTicks
      );
      global.ChunkTerritory.save(server);
    }
  });
}
