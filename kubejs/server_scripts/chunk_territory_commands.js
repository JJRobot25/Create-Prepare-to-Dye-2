// Chunk Territory Commands

ServerEvents.loaded(function(event) {
    console.log('[territory] Server loaded');
    try {
        if (global.ChunkTerritory) {
            global.ChunkTerritory.load(event.server);
        } else {
            console.log('[territory] ERROR: global.ChunkTerritory is undefined');
        }
    } catch(e) {
        console.log('[territory] Load error: ' + e);
    }
});

ServerEvents.commandRegistry(function(event) {
    var Commands = event.commands;

    event.register(
        Commands.literal('territory')
            .requires(function(s) { return s.hasPermission(2); })

            .then(Commands.literal('add')
                .executes(function(ctx) {
                    try {
                        console.log('[territory] add: starting');

                        console.log('[territory] add: getting source');
                        var source = ctx.source;

                        console.log('[territory] add: getting player');
                        var player = source.player;

                        if (!player) {
                            console.log('[territory] add: no player');
                            source.sendFailure('Must be a player');
                            return 0;
                        }

                        console.log('[territory] add: getting chunk position');
                        var chunkPos = player.chunkPosition();
                        console.log('[territory] add: chunkPos = ' + chunkPos);

                        var cx = chunkPos.x;
                        var cz = chunkPos.z;
                        console.log('[territory] add: cx=' + cx + ' cz=' + cz);

                        console.log('[territory] add: getting uuid');
                        var uuid = player.uuid.toString();
                        console.log('[territory] add: uuid=' + uuid);

                        console.log('[territory] add: checking global.ChunkTerritory');
                        if (!global.ChunkTerritory) {
                            console.log('[territory] add: ChunkTerritory is undefined!');
                            source.sendFailure('ChunkTerritory not initialized');
                            return 0;
                        }

                        console.log('[territory] add: calling add function');
                        global.ChunkTerritory.add(uuid, cx, cz);

                        console.log('[territory] add: sending success');
                        source.sendSuccess('Added chunk [' + cx + ', ' + cz + ']', true);
                        return 1;
                    } catch(e) {
                        console.log('[territory] add ERROR: ' + e);
                        console.log('[territory] add ERROR stack: ' + e.stack);
                        return 0;
                    }
                })
            )

            .then(Commands.literal('remove')
                .executes(function(ctx) {
                    try {
                        var player = ctx.source.player;
                        if (!player) return 0;
                        var cx = player.chunkPosition().x;
                        var cz = player.chunkPosition().z;
                        global.ChunkTerritory.remove(cx, cz);
                        ctx.source.sendSuccess('Removed chunk [' + cx + ', ' + cz + ']', true);
                        return 1;
                    } catch(e) {
                        console.log('[territory] remove ERROR: ' + e);
                        return 0;
                    }
                })
            )

            .then(Commands.literal('info')
                .executes(function(ctx) {
                    try {
                        var player = ctx.source.player;
                        if (!player) return 0;
                        var cx = player.chunkPosition().x;
                        var cz = player.chunkPosition().z;
                        var owner = global.ChunkTerritory.getOwner(cx, cz);
                        ctx.source.sendSuccess('Chunk [' + cx + ', ' + cz + ']: ' + (owner || 'unowned'), false);
                        return 1;
                    } catch(e) {
                        console.log('[territory] info ERROR: ' + e);
                        return 0;
                    }
                })
            )

            .then(Commands.literal('test')
                .executes(function(ctx) {
                    try {
                        console.log('[territory] test: global = ' + typeof global);
                        console.log('[territory] test: ChunkTerritory = ' + typeof global.ChunkTerritory);
                        if (global.ChunkTerritory) {
                            console.log('[territory] test: chunks = ' + JSON.stringify(global.ChunkTerritory.chunks));
                        }
                        ctx.source.sendSuccess('Check log for output', false);
                        return 1;
                    } catch(e) {
                        console.log('[territory] test ERROR: ' + e);
                        return 0;
                    }
                })
            )
    );

    console.log('[territory] Commands registered');
});
