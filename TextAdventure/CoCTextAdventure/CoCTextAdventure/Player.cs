using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoCTextAdventure
{
    public class Player
    {
        public string Name { get; set; }
        public ObservableCollection<InventoryItem> Inventory { get; private set; }

        public Player()
        {
            Inventory = new ObservableCollection<InventoryItem>();
            Inventory.CollectionChanged += Inventory_CollectionChanged;
        }

        private void Inventory_CollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
        {
            if (e.Action != NotifyCollectionChangedAction.Add) return;
            foreach (InventoryItem item in e.NewItems)
            {
                Console.WriteLine("Received '{0}'!\n({1})", item.Name, item.Description);
            }

            Console.WriteLine();
            Console.ReadLine();
        }

        public bool HasItem(string name)
        {
            return Inventory.Any(item => item.Name.ToLower().Equals(name.ToLower()));
        }
    }
}
