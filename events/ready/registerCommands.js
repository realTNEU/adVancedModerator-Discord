require("colors");
const { testServerId } = require("../../config.json");
const commandComparing = require("../../utils/commandComparing");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getlocalCommands");

module.exports = async (client) => {
  try {
    const [localCommands, applicationCommands] = await Promise.all([
      getLocalCommands(),
      getApplicationCommands(client, testServerId),
    ]);

    for (const localCommand of localCommands) {
      const { data, deleted } = localCommand;
      const {
        name: commandName,
        description: commandDescription,
        options: commandOptions,
      } = data;
      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === commandName
      );

      if (deleted) {
        if (existingCommand) {
          await applicationCommands.delete(existingCommand.id);
          console.log(
            `[COMMAND REGISTRY] Application Command ${commandName} has been deleted!`
              .red
          );
        } else {
          console.log(
            `[COMMAND REGISTRY] Application Command ${commandName} has been skipped, since property "delete" is set to true`
              .blue
          );
        }
      } else if (existingCommand, localCommand) {
        if (commandComparing(existingCommand, commandOptions)) {
          await applicationCommands.edit(existingCommand.id, {
            name: commandName,
            description: commandDescription,
            options: commandOptions,
          });
          console.log(
            `[COMMAND REGISTRY] Application Command ${commandName} has been edited!`
              .blue
          );
        }
      } else {
        await applicationCommands.create({
          name: commandName,
          description: commandDescription,
          options: commandOptions,
        });
        console.log(
          `[COMMAND REGISTRY] Application Command ${commandName} has been registered!`
            .green
        );
      }
    }
  } catch (error) {
    console.log(
      `[COMMAND REGISTRY ERROR] An error has occoured in the command registry: \n ${error} `
        .red
    );
  }
};
