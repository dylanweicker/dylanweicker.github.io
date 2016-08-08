using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoCTextAdventure.Screens
{
    public class IntroScreen : GameScreen
    {
        private readonly Player _player;

        public IntroScreen(Player player)
        {
            MenuItems = new Dictionary<string, Func<GameScreen>> 
        {
            {"Pick up empty bottles, chips and pretzels", () => 
                                    { 
                                        MenuItems.Remove("Pick up empty bottles, chips and pretzels");
                                        _player.Inventory.Add(new InventoryItem { Name = "Living Room badge", Description = "A badge that certifies the living room has been cleaned up." });
                                        return this; 
                                    } }
        };
            _player = player;
        }

        public override GameScreen Run()
        {
            Console.Clear();
            if (!_player.HasItem("GREEN BAG")) return Intro();
            return Menu();
        }

        private GameScreen Intro()
        {
            Write("The Haunting\nAn Intro to Call of Cthulhu\n\nStory written by Ben Monroe and Sandy Petersen\nText Adventure developed by Dylan Weicker");
            Write("Call of Cthulhu is Chaosium's classic roleplaying game of Lovecraftian horror\nin which ordinary people are confronted by the terrifying and alien forces of\nthe Cthulhu Mythos.");
            Write("Ah! There you are! Time to clean up this mess!\nHere's a [GREEN BAG], meet you in the [KITCHEN] in 30 minutes!");

            var bag = new InventoryItem { Name = "GREEN BAG", Description = "A general-purpose garbage bag." };
            _player.Inventory.Add(bag);

            var name = string.Empty;
            int attempts = 0;
            while (string.IsNullOrEmpty(name))
            {
                attempts++;
                string prompt;
                if (attempts == 1)
                {
                    prompt = "You get up, pick up the bag and remember your name (enter it!):";
                    name = Prompt(prompt);
                }
                else if (attempts < 3)
                {
                    prompt = "Uh, don't you remember your name?";
                    name = Prompt(prompt);
                }
                else
                {
                    name = "Rudolph";
                    prompt = string.Format("Ok nevermind, we'll call you {0}.", name);
                    Write(prompt);
                }
            }
            _player.Name = name;

            return Menu();
        }
    }
}
