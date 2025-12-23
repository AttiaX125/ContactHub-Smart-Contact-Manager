var addMainBtn = document.querySelector("#mainAddBtn");
var ContactModel = document.querySelector("#ContactModel");
var cancelModalBtn = document.querySelectorAll(".cancelModalBtn");
/* form catching*/
var contactName = document.querySelector("#contactName");
var contactPhone = document.querySelector("#contactPhone");
var contactEmail = document.querySelector("#contactEmail");
var contactAdress = document.querySelector("#contactAdress");
var contactGroup = document.querySelector("#contactGroup");
var contactNotes = document.querySelector("#contactNotes");
/**/
var saveModalBtn = document.querySelector("#saveModalBtn");
var formObject = {};
var ContactModalCard = ``;
var addNewCard = document.querySelector("#addCard");
var mainActionCards = document.querySelector("#mainActionCards");
var successModal2 = document.querySelector("#successModal2");
var contactsList;
var UpdateContactModal = document.querySelector("#UpdateContactModal");
/**/
var totalContacts = document.querySelector("#totalContacts");
var favContacts = document.querySelector("#favTotalContacts");
var favorite = document.querySelector("#contactFavorite");
var emergency = document.querySelector("#contactEmergency");
var emergencyContacts = document.querySelector("#emergencyTotalContacts");
var favouriteCounts;
var emergencyCounts;
var deleteCardModel = document.querySelector("#deleteCardModel");
/* */
var deletebtn;
var editBtn;
var favBtn;
var emgBtn;
var favStar = document.querySelector(".favStar");
var index;
var updateIndex;
var pendingIndex = null;
var confirmDeleteBtn = document.querySelector("#confirmDeleteBtn");
var cancelDeleteBtn = document.querySelector("#cancelDeleteBtn");
/* */
var favDiv = document.querySelector("#favDiv");
var actionModalTitle = document.querySelector("#actionModalTitle");
var actionModalMessage = document.querySelector("#actionModalMessage");
var emergencyDiv =document.querySelector("#emergencyDiv");
const MODAL_TEXTS = {
  add: {
    title: "Added!",
    message: "You added the contact successfully.",
  },
  delete: {
    title: "Deleted!",
    message: "The contact has been deleted successfully.",
  },
};
const REGEX = {
  name: /^[A-Za-z\u0600-\u06FF\s]{2,50}$/,          // letters + spaces, 2-50 (English + Arabic)
  phone: /^(010|011|012|015)\d{8}$/,                // Egyptian: 010/011/012/015 + 8 digits
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/            // solid simple email
};
/**/
// Invalid popup elements
var invalidModal = document.querySelector("#invalidModal");
var invalidTitle = document.querySelector("#invalidTitle");
var invalidMessage = document.querySelector("#invalidMessage");
var invalidOkBtn = document.querySelector("#invalidOkBtn");
var nameErr  = document.querySelector("#ContactModel #contactNameError");
var phoneErr = document.querySelector("#ContactModel #contactPhoneError");
var emailErr = document.querySelector("#ContactModel #contactEmailError");
var searchInput = document.querySelector("#searchInput");
/* Event Handler*/
addMainBtn.addEventListener("click", function () {
  console.log("Button clicked");
  ContactModel.classList.remove("d-none");
});
document.addEventListener("click", function (e) {
  if (e.target.closest(".cancelModalBtn")) {
    contactModelClose();
  }
});
saveModalBtn.addEventListener("click", function (e) {
  addContact(e);
});
addNewCard.addEventListener("click", function (e) {
  deletebtn = e.target.closest(".deleteContactBtn");
  editBtn = e.target.closest(".editContactBtn");
  favBtn = e.target.closest(".favCon");
  emgBtn = e.target.closest(".emgBtn")
  if (deletebtn) {
    console.log(deletebtn);
    pendingIndex = Number(deletebtn.dataset.index);
    mainActionCards.classList.remove("d-none");
    deleteCardModel.classList.remove("d-none");
    console.log(" Hellow from the delte");
    return;
  } else if (editBtn) {
    editIndex = Number(editBtn.dataset.index);
    editeContactModal(editIndex); 
  } else if (favBtn) {
    const i = Number(favBtn.dataset.index);

    // toggle data
    contactsList[i].isFavorite = !contactsList[i].isFavorite;
    localStorage.setItem("contacts", JSON.stringify(contactsList));
    renderFavorites();
    // re-render (simplest)
    dispalyContactCard();
    updateContactsCounters();
  }else if(emgBtn){
    emgIndex =  Number(emgBtn.dataset.index);
        // toggle data
    contactsList[emgIndex].isEmergency = !contactsList[emgIndex].isEmergency;
    localStorage.setItem("contacts", JSON.stringify(contactsList));
    // re-render (simplest)
    dispalyContactCard();
    renderEmergencyContacts();
    updateContactsCounters();
  } else return;
});
UpdateContactModal.addEventListener("click", () => {
  UpdateContactModalFunction();
  contactModelClose();
});

confirmDeleteBtn.addEventListener("click", () => {
  if (pendingIndex === null) return;
  deleteContact(pendingIndex);
  pendingIndex = null;
  mainActionCards.classList.add("d-none");
  deleteCardModel.classList.add("d-none");
  showActionModal(MODAL_TEXTS.delete);
});
cancelDeleteBtn.addEventListener("click", () => {
  pendingIndex = null;
  mainActionCards.classList.add("d-none");
  deleteCardModel.classList.add("d-none");
});
invalidOkBtn.addEventListener("click", () => {
  closeInvalidPopup();
  // optional: reopen ContactModel so user fixes it
  ContactModel.classList.remove("d-none");
});

/*End of event Handler */

if (localStorage.getItem("contacts") == null) {
  contactsList = [];
  updateContactsCounters();
} else {
  contactsList = JSON.parse(localStorage.getItem("contacts"));
  dispalyContactCard();
  updateContactsCounters();
  renderFavorites();
  renderEmergencyContacts()
}

function showActionModal({ title, message }) {
  actionModalMessage.textContent = message;
  actionModalTitle.textContent = title;
  mainActionCards.classList.remove("d-none");
  successModal2.classList.remove("d-none");
  setTimeout(closeActionModal, 4000);
}
function closeActionModal() {
  mainActionCards.classList.add("d-none");
  successModal2.classList.add("d-none");
}

function contactModelClose() {
  ContactModel.classList.add("d-none");
}
/*openSuccessModal*/ /*
function openSuccessModal() {
  mainActionCards.classList.remove("d-none");
  successModal2.classList.remove("d-none");
  updateContactsCounters();
  setTimeout(closeSuccessModal, 4000);
}*/
/*
function closeSuccessModal() {
  mainActionCards.classList.add("d-none");
  successModal2.classList.add("d-none");
}*/
function addContact(e) {
  e.preventDefault();
  if (!validateContactForm()) return;
  contactinfo = {
    contactNameObj: contactName.value,
    contactPhoneObj: contactPhone.value,
    contactEmailObj: contactEmail.value,
    contactAdressObj: contactAdress.value,
    contactGroupObj: contactGroup.value,
    contactNotesObj: contactNotes.value,
    isFavorite: favorite.checked,
    isEmergency: emergency.checked,
  };
  contactsList.push(contactinfo);
  localStorage.setItem("contacts", JSON.stringify(contactsList));
  dispalyContactCard();
  contactModelClose();
  showActionModal(MODAL_TEXTS.add);
  renderFavorites();
  renderEmergencyContacts()
  updateContactsCounters();
  clearcontactForm();
}

function dispalyContactCard(list = contactsList) {
  addNewCard.innerHTML = "";
  ContactModalCard = "";
  list.forEach((c, i) => {
    ContactModalCard += `
                              <div class="col-lg-6  ">
                                <div
                                    class="contacts-cards bg-white rounded-2xl border-gray-100 shadow-sm overflow-hidden  d-flex flex-column">
                                    <div class="p-4 pb-3 flex-1">
                                        <div class="d-flex align-items-start gap-3">
                                            <div class="position-relative flex-shrink-0">
                                                <!--Card header-->
                                                <div
                                                    class="w-56px h-56px text-lg fw-semibold rounded-12px bg-linear-rose-pink shadow-sm d-flex justify-content-center align-items-center text-white">
                                                    ${c.contactNameObj
                                                      .slice(0, 2)
                                                      .toUpperCase()}</div>
                                 <div
                                 
                                    class="${
                                      c.isFavorite ? "" : "d-none"
                                    } favStar position-absolute ring-2-white rounded-circle z-3 w-20px h-20px right-2px- top-2px- bg-linear-amb400-or500 d-flex align-items-center justify-content-center shadow-lg-blue ">
                                    <i class="fa-solid fa-star text-white text-8px"></i>
                                </div>
                                  <div
                                    class="
                                    ${
                                      c.isEmergency ? "" : "d-none"
                                    }
                                    position-absolute ring-2-white rounded-circle z-3 w-20px h-20px right-2px- bottom-2px- bg-linear-rose500-red600 d-flex align-items-center justify-content-center shadow-lg-blue">
                                    <i class="fa-solid fa-heart-pulse text-white text-8px"></i>
                                </div>
                                            </div>
                                            <div>
                                                <h3 class="fw-semibold text-gray-900 text-truncate text-base">${
                                                  c.contactNameObj
                                                }</h3>
                                                <div class="d-flex align-items-center gap-3 mt-1">
                                                    <div
                                                        class="flex-shrink-0 d-flex align-items-center justify-content-center w-26px h-26px  rounded-md bg-blue-100 ">
                                                        <i class="fa-solid fa-phone text-blue-600 text-9px"></i>
                                                    </div>
                                                    <span
                                                        class="text-gray-500 text-sm text-truncate">${
                                                          c.contactPhoneObj
                                                        }</span>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <!--Card details-->
                                        <div class="mt-3 space-y-2">
                                            <div class="d-flex align-items-center gap-3">
                                                <div
                                                    class="bg-violet-100 d-flex justify-content-center align-items-center flex-shrink-0 w-28 h-28 rounded-lg">
                                                    <i class="fa-solid fa-envelope text-violet-600 text-11px"></i>
                                                </div>
                                                <div class="text-gray-600 text-sm text-truncate">${
                                                  c.contactEmailObj
                                                }
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center gap-3">
                                                <div
                                                    class="bg-emerald-100 d-flex justify-content-center align-items-center flex-shrink-0 w-28 h-28 rounded-lg">
                                                    <i class="fa-solid fa-location-dot text-emerald-600 text-11px"></i>
                                                </div>
                                                <div class="text-gray-600 text-sm text-truncate">${
                                                  c.contactAdressObj
                                                }</div>
                                            </div>

                                        </div>
                                        <div
                                            class="border-t-gray-100 d-flex align-items-center justify-content-between px-4 mx-auto py-card-footer bg-gray-50-80 mt-3">
                                            <div class="d-flex align-items-center gap-2">
                                                <a href="tel:${
                                                  c.contactPhoneObj
                                                }"
                                                    class="text-emerald-600 bg-emerald-50 rounded-lg d-flex justify-content-center align-items-center  h-36px w-36px call text-decoration-none"><i
                                                        class="fa-solid fa-phone text-sm"></i></a>
                                                <a href="mailto:${
                                                  c.contactEmailObj
                                                }" 
                                                    class="text-violet-600 bg-violet-50 rounded-lg d-flex justify-content-center align-items-center h-36px w-36px border-0 email  text-decoration-none"><i
                                                        class="fa-solid fa-envelope text-sm"></i></a>

                                            </div>
                                            <div class="d-flex align-items-center gap-2">
                                                <button
                                                id = "favouriteIconBtn"
                                                data-index ="${i}"
                                                    class="w-36px favCon h-36px border-0 text-gray-500 bg-gray-50 rounded-lg d-flex align-items-center justify-content-center card-foot-btn1 card-foot-btns"><i
                                                        class="fa-regular fa-star text-sm favIcon"></i></button>
                                                <button
                                                data-index ="${i}"
                                                    class=" w-36px emgBtn h-36px border-0 text-gray-500 bg-gray-50 rounded-lg d-flex align-items-center justify-content-center card-foot-btn2 card-foot-btns"><i
                                                        class="fa-regular fa-heart text-sm"></i></button>
                                                <button
                                                data-index = "${i}"
                                                    class="editContactBtn w-36px h-36px border-0 text-gray-500 bg-gray-50 rounded-lg d-flex align-items-center justify-content-center card-foot-btn3 card-foot-btns"><i
                                                        class="fa-solid fa-pen text-sm"></i></button>
                                                <button
                                                data-index = "${i}"
                                                    class="deleteContactBtn w-36px h-36px border-0 text-gray-500 bg-gray-50 rounded-lg d-flex align-items-center justify-content-center card-foot-btn4 card-foot-btns"><i
                                                        class="fa-solid fa-trash"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
  `;
  });

  addNewCard.insertAdjacentHTML("beforeend", ContactModalCard);
}

function clearcontactForm() {
  contactAdress.value = "";
  contactEmail.value = "";
  contactGroup.value = "";
  contactName.value = "";
  contactNotes.value = "";
  contactPhone.value = "";
  favorite.checked = false;
  emergency.checked = false;
}
function updateContactsCounters() {
  totalContacts.textContent = contactsList.length;
  favouriteCounts = contactsList.filter((c) => c.isFavorite === true).length;
  emergencyCounts = contactsList.filter((c) => c.isEmergency === true).length;

  favContacts.textContent = favouriteCounts;
  emergencyContacts.textContent = emergencyCounts;
}

function deleteContact(deleteIndex) {
  contactsList.splice(deleteIndex, 1);
  localStorage.setItem("contacts", JSON.stringify(contactsList));
  dispalyContactCard();
  updateContactsCounters();
  renderFavorites();
  renderEmergencyContacts()
}

function editeContactModal(e) {
  ContactModel.classList.remove("d-none");
  saveModalBtn.classList.add("d-none");
  UpdateContactModal.classList.remove("d-none");
  updateIndex = e;
  contactName.value = contactsList[e].contactNameObj;
  contactEmail.value = contactsList[e].contactEmailObj;
  contactGroup.value = contactsList[e].contactGroupObj;
  contactPhone.value = contactsList[e].contactPhoneObj;
  contactAdress.value = contactsList[e].contactAdressObj;
  contactNotes.value = contactsList[e].contactNotesObj;
  favorite.checked = contactsList[e].isFavorite;
  emergency.checked = contactsList[e].isEmergency;
}
function UpdateContactModalFunction() {
  contactsList[updateIndex].contactNameObj = contactName.value;
  contactsList[updateIndex].contactEmailObj = contactEmail.value;
  contactsList[updateIndex].contactPhoneObj = contactPhone.value;
  contactsList[updateIndex].contactGroupObj = contactGroup.value;
  contactsList[updateIndex].contactAdressObj = contactAdress.value;
  contactsList[updateIndex].contactNotesObj = contactNotes.value;
  contactsList[updateIndex].isFavorite = favorite.checked;
  contactsList[updateIndex].isEmergency = emergency.checked;

  dispalyContactCard();
  localStorage.setItem("contacts", JSON.stringify(contactsList));
  renderFavorites();
  renderEmergencyContacts()
  updateContactsCounters();
}
var favContactContainer;
function renderFavorites() {
  favDiv.innerHTML = ""; // reset

  const favs = contactsList.filter((c) => c.isFavorite);

  if (favs.length === 0) {
    favDiv.innerHTML = `<p class="text-gray-400 text-sm text-center py-4">No favorites yet</p>`;
    return;
  }

  favContactContainer = "";

  favs.forEach((c) => {
    favContactContainer += `
      <div class="d-flex px-2 py-1 callDiv align-items-center gap-3 bg-gray-50 rounded-xl cursor-pointer">
        <div class="flex-shrink-0">
          <div class="shadow-sm fw-semibold text-white d-flex align-items-center justify-content-center bg-linear-rose500-red600 rounded-lg text-sm w-40px h-40px">
            ${c.contactNameObj.slice(0, 2).toUpperCase()}
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <h4 class="fw-medium text-gray-900 text-sm text-truncate">${
            c.contactNameObj
          }</h4>
          <p class="text-xs text-gray-500 text-truncate mb-0">${
            c.contactPhoneObj
          }</p>
        </div>

        <a href="tel:${c.contactPhoneObj}"
          class="flex-shrink-0 d-flex text-decoration-none w-32px h-32px align-items-center justify-content-center rounded-lg bg-emerald-100 callIcan">
          <i class="fa-solid fa-phone"></i>
        </a>
      </div>
    `;
  });

  favDiv.insertAdjacentHTML("beforeend", favContactContainer);
}
var emgContactContainer;
function renderEmergencyContacts() {
  emergencyDiv.innerHTML = ""; // reset

  const emergencies = contactsList.filter(c => c.isEmergency);

  if (emergencies.length === 0) {
    emergencyDiv.innerHTML = `
      <p class="text-gray-400 text-sm text-center py-4">
        No emergency yet
      </p>
    `;
    return;
  }

  emgContactContainer = "";

  emergencies.forEach(c => {
    emgContactContainer += `
      <div class="d-flex callDiv align-items-center gap-3 bg-gray-50 rounded-xl cursor-pointer">
        <div class="flex-shrink-0">
          <div
            class="shadow-sm fw-semibold text-white d-flex align-items-center justify-content-center
                   bg-linear-rose500-red600 rounded-lg text-sm w-40px h-40px">
            ${c.contactNameObj.slice(0, 2).toUpperCase()}
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <h4 class="fw-medium text-gray-900 text-sm text-truncate">
            ${c.contactNameObj}
          </h4>
          <p class="text-xs text-gray-500 text-truncate mb-0">
            ${c.contactPhoneObj}
          </p>
        </div>

        <a href="tel:${c.contactPhoneObj}"
           class="flex-shrink-0 d-flex text-decoration-none w-32px h-32px
                  align-items-center justify-content-center rounded-lg bg-emerald-100 callIcan">
          <i class="fa-solid fa-phone"></i>
        </a>
      </div>
    `;
  });

  emergencyDiv.insertAdjacentHTML("beforeend", emgContactContainer);
}

function openInvalidPopup(title, message) {
  invalidTitle.textContent = title;
  invalidMessage.textContent = message;

  // show popup (and keep it above everything)
  mainActionCards.classList.remove("d-none");  // your overlay wrapper
  invalidModal.classList.remove("d-none");

  // close ContactModel behind it (optional)
  ContactModel.classList.add("d-none");
}

function closeInvalidPopup() {
  invalidModal.classList.add("d-none");
  mainActionCards.classList.add("d-none");
}

invalidOkBtn.addEventListener("click", () => {
  closeInvalidPopup();
  // optional: reopen the contact modal so user fixes input
  ContactModel.classList.remove("d-none");
});
function validateContactForm() {
  hideAllFieldErrors();

  const nameVal = contactName.value.trim();
  const phoneVal = contactPhone.value.trim();
  const emailVal = contactEmail.value.trim();

  // 1) name
  if (!REGEX.name.test(nameVal)) {
    nameErr.classList.remove("d-none");
    openInvalidPopup(
      "Invalid Name",
      "Name should contain only letters and spaces (2-50 characters)"
    );
    return false;
  }

  // 2) phone
  if (!REGEX.phone.test(phoneVal)) {
    phoneErr.classList.remove("d-none");
    openInvalidPopup(
      "Invalid Phone",
      "Please enter a valid Egyptian phone number "
    );
    return false;
  }

  // 3) email
  if (!REGEX.email.test(emailVal)) {
    emailErr.classList.remove("d-none");
    openInvalidPopup(
      "Invalid Email",
      "Please enter a valid email address"
    );
    return false;
  }

  return true;
}
function hideAllFieldErrors() {
  nameErr.classList.add("d-none");
  phoneErr.classList.add("d-none");
  emailErr.classList.add("d-none");
}
function normalize(text) {
  return text.toLowerCase().trim();
}


searchInput.addEventListener("input", function () {
  const q = normalize(this.value);

  // If search empty → show all
  if (!q) {
    dispalyContactCard(contactsList);
    return;
  }

  const filtered = contactsList.filter(c => {
    const name = normalize(c.contactNameObj || "");
    const phone = c.contactPhoneObj || "";
    const email = normalize(c.contactEmailObj || "");
    return (
      name.includes(q) ||
      phone.includes(q) ||
      email.includes(q)
    );
  });

  dispalyContactCard(filtered);
});
