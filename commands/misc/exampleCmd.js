const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Test command to test if everything works")
    .setDMPermission(false)
    .addSubcommandGroup((subcommandgroup) =>
      subcommandgroup
        .setName("user")
        .setDescription("Configure a user")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("role")
            .setDescription("Configure a user's role")
            .addUserOption((option) =>
              option.setName("user").setDescription("The user to configure")
            )
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("nickname")
            .setDescription("Configure the user's nickname")
            .addStringOption((option) =>
              option
                .setName("nickname")
                .setDescription("The nickname the user should have")
            )
            .addUserOption((option) =>
              option.setName("user").setDescription("The user to configure")
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("message")
        .setDescription("Configure a messafe")
        
    ).toJSON(),
    userPermission: [PermissionFlagsBits.ManageMessages],
    botPermission: [PermissionFlagsBits.Connect],
    run: (client, interaction) =>{
        return interaction.reply('This is a test command')
    }
};
