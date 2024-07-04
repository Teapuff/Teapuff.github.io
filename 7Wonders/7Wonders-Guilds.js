architectsGuild = document.getElementById("architectsGuild");
counterfeitersGuild = document.getElementById("counterfeitersGuild");
courtesansGuild = document.getElementById("courtesansGuild");
diplomatsGuilds = document.getElementById("diplomatsGuilds");
gamersGuild = document.getElementById("gamersGuild");
guildOfShadows = document.getElementById("guildOfShadows");
mournersGuild = document.getElementById("mournersGuild");

architectsGuildText = "ARCHITECT'S GUILD/ARKITEKTERNAS SKRÅ \n3 VP för varje lila kort som byggts i grannstäderna.";
counterfeitersGuildText = "COUNTERFEITERS GUILD \nThe card earns 5 VP and causes the loss of 3 coins from all the other players.";
courtesansGuildText = "COURTESAN'S GUILD/KURTISANERNAS SKRÅ \nNär Kurtisanernas Skrå byggs måste spelaren omedelbart placera'Kurtisans'-markören på en av Ledarna i en grannstad. Spelarenerhåller då den Ledarens fördelar och hans eller hennes tillhörandeegenskapar. \n\nNotera: Detta skrå påverkar inte spelaren vars Ledare justBlivit uppvaktad en Kurtisan.";
diplomatsGuildsText = "DIPLOMAT'S GUILD/DIPLOMATERNAS SKRÅ \n1 VP för varje Ledare (vita kort) som rekryterats i grannstäderna.\n\nNotera: Endast rekryterade ledare räknas, inte de som använts för att bygga Underverksnivåer.";
guildOfShadowsText = "GUILD OF SHADOWS \nThe card earns 1 VP for each black card present in the two neighboring cities.";
gamersGuildText = "GAMER'S GUILD/SPELARNAS SKRÅ \n1 VP för var tredje mynt i spelarens ägo. \n\nNotera: Denna poängbonus läggs till den befintliga bonusen för ihopsamlade mynt.";
mournersGuildText = "MOURNERS GUILD \nThe card is worth 1 VP for each Victory Confict token preset in each of the two neighboring cities. \n\nClarification: the value of Victory Confict tokens (1, 3, or 5 points) isn't taken into account. Each token is worth 1 point to the owner of the Guild.";


architectsGuild.addEventListener("click", function(){ alert(architectsGuildText); });
counterfeitersGuild.addEventListener("click", function(){ alert(counterfeitersGuildText); });
courtesansGuild.addEventListener("click", function(){ alert(courtesansGuildText); });
diplomatsGuilds.addEventListener("click", function(){ alert(diplomatsGuildsText); });
gamersGuild.addEventListener("click", function(){ alert(gamersGuildText); });
guildOfShadows.addEventListener("click", function(){ alert(guildOfShadowsText); });
mournersGuild.addEventListener("click", function(){ alert(mournersGuildText); });
