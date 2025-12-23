import React from 'react';
import '../styles/Menu.css';

function Menu() {
  const menuData = {
    starters: [
      {
        name: 'Bruschetta',
        description: 'Fresh tomatoes, basil, olive oil and toasted baguette slices',
        price: '$8.50'
      },
      {
        name: 'Caesar Salad',
        description: 'Crisp romaine with homemade Caesar dressing',
        price: '$9.00'
      }
    ],
    mainCourses: [
      {
        name: 'Grilled Salmon',
        description: 'Served with lemon butter sauce and seasonal vegetables',
        price: '$22.00'
      },
      {
        name: 'Ribeye Steak',
        description: '12 oz prime cut with garlic mashed potatoes',
        price: '$28.00'
      },
      {
        name: 'Vegetable Risotto',
        description: 'Creamy Arborio rice with wild mushrooms',
        price: '$18.00'
      }
    ],
    desserts: [
      {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with mascarpone',
        price: '$7.50'
      },
      {
        name: 'Cheesecake',
        description: 'Creamy cheesecake with berry compote',
        price: '$7.00'
      }
    ],
    beverages: [
      {
        name: 'Red Wine (Glass)',
        description: 'A selection of Italian reds',
        price: '$10.00'
      },
      {
        name: 'White Wine (Glass)',
        description: 'Crisp and refreshing',
        price: '$9.00'
      },
      {
        name: 'Craft Beer',
        description: 'Local artisan brews',
        price: '$6.00'
      },
      {
        name: 'Espresso',
        description: 'Strong and aromatic',
        price: '$3.00'
      }
    ]
  };

  const MenuItem = ({ item }) => (
    <div className="menu-item">
      <div className="menu-item-header">
        <h3>{item.name}</h3>
        <span className="price">{item.price}</span>
      </div>
      <p className="description">{item.description}</p>
    </div>
  );

  return (
    <div className="menu-page">
      <div className="menu-hero">
        <h1>Our Menu</h1>
        <p>Authentic Italian Cuisine Crafted with Passion</p>
      </div>

      <div className="menu-container">
        <section className="menu-section">
          <h2 className="section-title">Starters</h2>
          <div className="menu-items">
            {menuData.starters.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </div>
        </section>

        <section className="menu-section">
          <h2 className="section-title">Main Courses</h2>
          <div className="menu-items">
            {menuData.mainCourses.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </div>
        </section>

        <section className="menu-section">
          <h2 className="section-title">Desserts</h2>
          <div className="menu-items">
            {menuData.desserts.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </div>
        </section>

        <section className="menu-section">
          <h2 className="section-title">Beverages</h2>
          <div className="menu-items">
            {menuData.beverages.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Menu;