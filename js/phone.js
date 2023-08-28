const loadPhone = async (searchText = 'a', isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  // display show all button if there are more than 12 mobile.
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.style.display = "block";
  } else {
    showAllContainer.style.display = "none";
  }

  // display only first 10 mobile
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 shadow-xl my-8 border border-gray-300`;
    phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="iPhone" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary capitalize mt-4">Show Details</button>
            </div>
        </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoading(false);
};

//
const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  console.log(phone);
  showPhoneDetails(phone);
};
const showPhoneDetails = (phoneDetails) => {
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
  <div class="bg-[#f5f7fa] p-8 rounded-xl">
  <img src="${phoneDetails.image}" class="text-center mx-auto">
  </div>
  
  <h3 id="show-detail-phone-name" class="font-bold text-3xl mt-10 mb-6">${phoneDetails.name}</h3>
  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
  <h4 class="text-lg font-bold text-[#403F3F] my-4">Storage: <span class="text-[#706F6F] font-normal">${phoneDetails?.mainFeatures?.storage}</span></h4>
  <h4 class="text-lg font-bold text-[#403F3F] my-4">Display Size: <span class="text-[#706F6F] font-normal">${phoneDetails?.mainFeatures?.displaySize}</span></h4>
  <h4 class="text-lg font-bold text-[#403F3F] my-4">Chipset: <span class="text-[#706F6F] font-normal">${phoneDetails?.mainFeatures?.chipSet}</span></h4>
  <h4 class="text-lg font-bold text-[#403F3F] my-4">Memory: <span class="text-[#706F6F] font-normal">${phoneDetails?.mainFeatures?.memory}</span></h4>
  <h4 class="text-lg font-bold text-[#403F3F] my-4">Slug: <span class="text-[#706F6F] font-normal">${phoneDetails?.slug}</span></h4>
  <h4 class="text-lg font-bold text-[#403F3F] my-4">Release data: <span class="text-[#706F6F] font-normal">${phoneDetails?.releaseDate}</span></h4>
  <h4 class="text-lg font-bold text-[#403F3F] my-4">Brand: <span class="text-[#706F6F] font-normal">${phoneDetails?.brand}</span></h4>
  <h4 class="text-lg font-bold text-[#403F3F] my-4">GPS: <span class="text-[#706F6F] font-normal">${phoneDetails?.others?.GPS}</span></h4>
  `;
  show_details_modal.showModal();
};

const handleSearch = (isShowAll) => {
  toggleLoading(true);
  const searchField = document.getElementById("search-field");
  const searchValue = searchField.value;
  loadPhone(searchValue, isShowAll);
};

const toggleLoading = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};
loadPhone();
