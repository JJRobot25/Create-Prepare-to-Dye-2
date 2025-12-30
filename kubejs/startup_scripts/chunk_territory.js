// Chunk Territory System - Simple version

global.ChunkTerritory = {
    chunks: {},  // "cx,cz" -> playerUuid

    owns: function(playerUuid, cx, cz) {
        var key = cx + ',' + cz;
        return this.chunks[key] === playerUuid;
    },

    getOwner: function(cx, cz) {
        var key = cx + ',' + cz;
        return this.chunks[key] || null;
    },

    add: function(playerUuid, cx, cz) {
        var key = cx + ',' + cz;
        this.chunks[key] = playerUuid;
        console.log('[territory] Added chunk ' + key + ' to ' + playerUuid);
    },

    remove: function(cx, cz) {
        var key = cx + ',' + cz;
        delete this.chunks[key];
        console.log('[territory] Removed chunk ' + key);
    },

    getPlayerChunks: function(playerUuid) {
        var result = [];
        for (var key in this.chunks) {
            if (this.chunks[key] === playerUuid) {
                result.push(key);
            }
        }
        return result;
    },

    save: function(server) {
        try {
            var level = server.getLevel('minecraft:overworld');
            if (level) {
                level.persistentData.putString('chunkTerritory', JSON.stringify(this.chunks));
                console.log('[territory] Saved ' + Object.keys(this.chunks).length + ' chunks');
            }
        } catch(e) {
            console.log('[territory] Save error: ' + e);
        }
    },

    load: function(server) {
        try {
            var level = server.getLevel('minecraft:overworld');
            if (level && level.persistentData.contains('chunkTerritory')) {
                this.chunks = JSON.parse(level.persistentData.getString('chunkTerritory'));
                console.log('[territory] Loaded ' + Object.keys(this.chunks).length + ' chunks');
            }
        } catch(e) {
            console.log('[territory] Load error: ' + e);
        }
    }
};

console.log('[territory] Startup script loaded');
