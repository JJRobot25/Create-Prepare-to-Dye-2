// Destroy Speed - All blocks break faster, no tool required

BlockEvents.modification((event) => {
  // All blocks break 11x faster, no tool required
  event.modify("/.*/", (block) => {
    block.requiresTool = false;
    block.destroySpeed = Block.getBlock(block.id).defaultDestroyTime() / 11;
  });

  // Iron plates break extra fast (30x)
  event.modify("/^quark:iron_plate.*/", (block) => {
    block.destroySpeed = Block.getBlock(block.id).defaultDestroyTime() / 30;
  });
});
