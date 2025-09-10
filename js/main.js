const API = "https://rickandmortyapi.com/api/character";
const grid = document.getElementById("grid");
const status = document.getElementById("status");

// عناصر المودال
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalStatus = document.getElementById("modal-status");
const modalSpecies = document.getElementById("modal-species");
const modalGender = document.getElementById("modal-gender");
const modalOrigin = document.getElementById("modal-origin");
const modalLocation = document.getElementById("modal-location");
const modalEpisodes = document.getElementById("modal-episodes");

// فتح المودال
function openModal(character) {
  modalImg.src = character.image;
  modalName.textContent = character.name;
  modalStatus.textContent = `الحالة: ${character.status}`;
  modalSpecies.textContent = character.species;
  modalGender.textContent = character.gender;
  modalOrigin.textContent = character.origin.name;
  modalLocation.textContent = character.location.name;
  modalEpisodes.textContent = character.episode.length;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

// إغلاق المودال
function closeModal() {
  modal.classList.remove("flex");
  modal.classList.add("hidden");
}

// تحميل الشخصيات
async function loadCharacters() {
  status.textContent = "جاري التحميل...";
  try {
    const res = await fetch(API);
    const data = await res.json();

    data.results.forEach((c) => {
      const card = document.createElement("div");
      card.className =
        "bg-white rounded-xl shadow hover:shadow-lg overflow-hidden cursor-pointer transition";
      card.innerHTML = `
        <img src="${c.image}" alt="${c.name}" class="w-full h-48 object-cover">
        <div class="p-2 text-center">
          <h3 class="font-semibold text-gray-800">${c.name}</h3>
        </div>
      `;
      card.addEventListener("click", () => openModal(c));
      grid.appendChild(card);
    });

    status.textContent = "";
  } catch (err) {
    status.textContent = "فشل تحميل البيانات.";
  }
}

// أحداث إغلاق المودال
modal.addEventListener("click", (e) => {
  if (e.target.dataset.close !== undefined) {
    closeModal();
  }
});

// تشغيل
loadCharacters();
