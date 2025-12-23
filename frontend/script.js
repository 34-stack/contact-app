const form = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");
const successMsg = document.getElementById("successMsg");

// Submit contact form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    message: message.value
  };

  // Simple email validation
  if (!data.email.includes("@")) {
    alert("Please enter a valid email");
    return;
  }

  // POST request to backend
  const res = await fetch("http://localhost:5000/api/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await res.json();

  successMsg.innerText = result.message;
  form.reset();
  loadContacts();
});

// Load contacts from backend
async function loadContacts() {
  const res = await fetch("http://localhost:5000/api/contacts");
  const contacts = await res.json();

  contactList.innerHTML = "";
  contacts.forEach(c => {
    contactList.innerHTML += `
      <tr>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${c.phone || ""}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteContact('${c._id}')">Delete</button>
        </td>
      </tr>`;
  });
}

// Delete contact
async function deleteContact(id) {
  await fetch(`http://localhost:5000/api/contacts/${id}`, {
    method: "DELETE"
  });
  loadContacts();
}

// Initial load
loadContacts();
