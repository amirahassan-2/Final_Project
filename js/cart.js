const items = [
      {
        title: "Emily and the Backbone",
        author: "Clse Marnsa",
        isbn: "512512351",
        price: 21.4,
        qty: 1
      },
      {
        title: "So You Want To Talk About Race",
        author: "Iyoma Oluo",
        isbn: "241241245",
        price: 15.63,
        qty: 4
      }
    ];

    const cartTable = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const taxEl = document.getElementById("tax");
    const totalEl = document.getElementById("total");

    function renderCart() {
      cartTable.innerHTML = "";
      let subtotal = 0;

      items.forEach((item, index) => {
        const totalPrice = item.price * item.qty;
        subtotal += totalPrice;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="text-start">
            <strong>${item.title}</strong><br>
            <span class="text-muted small">${item.author}</span><br>
            <span class="text-muted small">ISBN ${item.isbn}</span>
          </td>
          <td>
            <div class="d-flex justify-content-center align-items-center gap-2">
              <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${index}, -1)">−</button>
              <span>${item.qty}</span>
              <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${index}, 1)">+</button>
            </div>
          </td>
          <td>$${item.price.toFixed(2)}</td>
          <td>$${totalPrice.toFixed(2)}</td>
          <td><button class="btn btn-sm " onclick="deleteItem(${index})"><i class="fa-solid fa-trash"></i></button></td>
        `;
        cartTable.appendChild(row);
      });

      const tax = subtotal * 0.028;
      const total = subtotal + tax;

      subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
      taxEl.textContent = `$${tax.toFixed(2)}`;
      totalEl.textContent = `$${total.toFixed(2)}`;
    }

    function changeQty(index, delta) {
      items[index].qty += delta;
      if (items[index].qty < 1) items[index].qty = 1;
      renderCart();
    }

    function deleteItem(index) {
      items.splice(index, 1);
      renderCart();
    }

    renderCart();