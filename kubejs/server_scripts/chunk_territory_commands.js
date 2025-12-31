// Chunk Territory Commands

var IntegerArgumentType = Java.loadClass('com.mojang.brigadier.arguments.IntegerArgumentType');
var EntityArgument = Java.loadClass('net.minecraft.commands.arguments.EntityArgument');

ServerEvents.loaded(function(event) {
    if (global.ChunkTerritory) {
        global.ChunkTerritory.load(event.server);
    }
});

// Helper to get chunk coords from command source position
function getSourceChunk(ctx) {
    var pos = ctx.source.position;
    return { x: Math.floor(pos.x() / 16), z: Math.floor(pos.z() / 16) };
}

function getLocalPos(ctx) {
    var pos = ctx.source.position;
    var cx = Math.floor(pos.x() / 16);
    var cz = Math.floor(pos.z() / 16);
    return { x: pos.x() - cx * 16, z: pos.z() - cz * 16 };
}

function addAdjacentChunk(ctx, targetPlayer, ticks) {
    if (!global.ChunkTerritory) { ctx.source.sendFailure('Not initialized'); return 0; }

    var chunk = getSourceChunk(ctx);
    var local = getLocalPos(ctx);

    // Find closest edge
    var distW = local.x, distE = 16 - local.x;
    var distN = local.z, distS = 16 - local.z;
    var min = Math.min(distW, distE, distN, distS);

    var adjX = chunk.x, adjZ = chunk.z;
    if (min === distW) adjX = chunk.x - 1;
    else if (min === distE) adjX = chunk.x + 1;
    else if (min === distN) adjZ = chunk.z - 1;
    else adjZ = chunk.z + 1;

    var uuid = targetPlayer.uuid.toString();
    global.ChunkTerritory.add(uuid, adjX, adjZ);

    var targetName = targetPlayer.name.string;
    if (ticks > 0) {
        ctx.source.sendSuccess('Added chunk [' + adjX + ', ' + adjZ + '] for ' + targetName + ' for ' + ticks + ' ticks', true);
        ctx.source.server.scheduleInTicks(ticks, function() {
            global.ChunkTerritory.remove(adjX, adjZ);
            targetPlayer.tell('Temporary chunk [' + adjX + ', ' + adjZ + '] expired');
        });
    } else {
        ctx.source.sendSuccess('Added chunk [' + adjX + ', ' + adjZ + '] for ' + targetName, true);
    }
    return 1;
}

ServerEvents.commandRegistry(function(event) {
    var Commands = event.commands;

    event.register(
        Commands.literal('territory')
            .requires(function(s) { return s.hasPermission(2); })

            .then(Commands.literal('add')
                .then(Commands.argument('player', EntityArgument.player())
                    .executes(function(ctx) {
                        if (!global.ChunkTerritory) { ctx.source.sendFailure('Not initialized'); return 0; }
                        var target = EntityArgument.getPlayer(ctx, 'player');
                        var chunk = getSourceChunk(ctx);
                        global.ChunkTerritory.add(target.uuid.toString(), chunk.x, chunk.z);
                        ctx.source.sendSuccess('Added chunk [' + chunk.x + ', ' + chunk.z + '] for ' + target.name.string, true);
                        return 1;
                    })
                )
            )

            .then(Commands.literal('add_adjacent')
                .then(Commands.argument('player', EntityArgument.player())
                    .executes(function(ctx) {
                        var target = EntityArgument.getPlayer(ctx, 'player');
                        return addAdjacentChunk(ctx, target, 0);
                    })
                    .then(Commands.argument('ticks', IntegerArgumentType.integer(1))
                        .executes(function(ctx) {
                            var target = EntityArgument.getPlayer(ctx, 'player');
                            return addAdjacentChunk(ctx, target, IntegerArgumentType.getInteger(ctx, 'ticks'));
                        })
                    )
                )
            )

            .then(Commands.literal('add_north')
                .then(Commands.argument('player', EntityArgument.player())
                    .executes(function(ctx) {
                        if (!global.ChunkTerritory) return 0;
                        var target = EntityArgument.getPlayer(ctx, 'player');
                        var chunk = getSourceChunk(ctx);
                        global.ChunkTerritory.add(target.uuid.toString(), chunk.x, chunk.z - 1);
                        ctx.source.sendSuccess('Added chunk [' + chunk.x + ', ' + (chunk.z - 1) + '] for ' + target.name.string, true);
                        return 1;
                    })
                )
            )

            .then(Commands.literal('add_south')
                .then(Commands.argument('player', EntityArgument.player())
                    .executes(function(ctx) {
                        if (!global.ChunkTerritory) return 0;
                        var target = EntityArgument.getPlayer(ctx, 'player');
                        var chunk = getSourceChunk(ctx);
                        global.ChunkTerritory.add(target.uuid.toString(), chunk.x, chunk.z + 1);
                        ctx.source.sendSuccess('Added chunk [' + chunk.x + ', ' + (chunk.z + 1) + '] for ' + target.name.string, true);
                        return 1;
                    })
                )
            )

            .then(Commands.literal('add_east')
                .then(Commands.argument('player', EntityArgument.player())
                    .executes(function(ctx) {
                        if (!global.ChunkTerritory) return 0;
                        var target = EntityArgument.getPlayer(ctx, 'player');
                        var chunk = getSourceChunk(ctx);
                        global.ChunkTerritory.add(target.uuid.toString(), chunk.x + 1, chunk.z);
                        ctx.source.sendSuccess('Added chunk [' + (chunk.x + 1) + ', ' + chunk.z + '] for ' + target.name.string, true);
                        return 1;
                    })
                )
            )

            .then(Commands.literal('add_west')
                .then(Commands.argument('player', EntityArgument.player())
                    .executes(function(ctx) {
                        if (!global.ChunkTerritory) return 0;
                        var target = EntityArgument.getPlayer(ctx, 'player');
                        var chunk = getSourceChunk(ctx);
                        global.ChunkTerritory.add(target.uuid.toString(), chunk.x - 1, chunk.z);
                        ctx.source.sendSuccess('Added chunk [' + (chunk.x - 1) + ', ' + chunk.z + '] for ' + target.name.string, true);
                        return 1;
                    })
                )
            )

            .then(Commands.literal('remove')
                .executes(function(ctx) {
                    if (!global.ChunkTerritory) return 0;
                    var chunk = getSourceChunk(ctx);
                    global.ChunkTerritory.remove(chunk.x, chunk.z);
                    ctx.source.sendSuccess('Removed chunk [' + chunk.x + ', ' + chunk.z + ']', true);
                    return 1;
                })
            )

            .then(Commands.literal('info')
                .executes(function(ctx) {
                    if (!global.ChunkTerritory) return 0;
                    var chunk = getSourceChunk(ctx);
                    var owner = global.ChunkTerritory.getOwner(chunk.x, chunk.z);
                    ctx.source.sendSuccess('Chunk [' + chunk.x + ', ' + chunk.z + ']: ' + (owner || 'unowned'), false);
                    return 1;
                })
            )

            .then(Commands.literal('list')
                .executes(function(ctx) {
                    if (!global.ChunkTerritory) return 0;
                    var chunks = global.ChunkTerritory.chunks;
                    var keys = Object.keys(chunks);
                    ctx.source.sendSuccess('Owned chunks: ' + keys.length, false);
                    for (var i = 0; i < keys.length; i++) {
                        ctx.source.sendSuccess('  ' + keys[i] + ' -> ' + chunks[keys[i]], false);
                    }
                    return 1;
                })
            )
    );
});
