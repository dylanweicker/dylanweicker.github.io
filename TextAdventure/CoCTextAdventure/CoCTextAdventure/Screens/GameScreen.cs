using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoCTextAdventure.Screens
{
    public abstract class GameScreen
    {
        protected IDictionary<string, Func<GameScreen>> MenuItems;

        public abstract GameScreen Run();

        protected void Write(string text)
        {
            Console.Write(text);
            Console.WriteLine();
            Console.WriteLine("[ENTER]");
            Console.ReadLine();
        }

        protected string Prompt(string text)
        {
            Console.WriteLine(text);
            var result = Console.ReadLine();
            Console.WriteLine();
            return result;
        }

        protected GameScreen Menu()
        {
            Console.WriteLine("What do you do?");

            var i = 0;
            foreach (var item in MenuItems)
            {
                i++;
                Console.WriteLine("[{0}] {1}", i, item.Key);
            }

            Console.WriteLine();
            Console.WriteLine("Selection?");
            var input = Console.ReadLine();

            int selection;
            if (int.TryParse(input, out selection))
            {
                if (selection > 0 && selection <= MenuItems.Count)
                {
                    return MenuItems.ElementAt(selection - 1).Value();
                }
            }

            return null;
        }
    }
}
