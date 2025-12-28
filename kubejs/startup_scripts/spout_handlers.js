// Spout Handlers - Custom spout filling behaviors

CreateEvents.spoutHandler((event) => {
  // Fill empty cauldron with water
  event.add("fill_cauldron_water", "minecraft:cauldron", (block, fluid, simulate) => {
    if (fluid.id === "minecraft:water" && fluid.amount >= 1000) {
      if (!simulate) {
        block.set("minecraft:water_cauldron", { level: "3" });
      }
      return 1000;
    }
    return 0;
  });

  // Fill empty cauldron with lava
  event.add("fill_cauldron_lava", "minecraft:cauldron", (block, fluid, simulate) => {
    if (fluid.id === "minecraft:lava" && fluid.amount >= 1000) {
      if (!simulate) {
        block.set("minecraft:lava_cauldron");
      }
      return 1000;
    }
    return 0;
  });
});
