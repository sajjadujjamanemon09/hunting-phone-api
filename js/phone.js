const loadPhone = async (searchText =13, isShowAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};





const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  //  1. get id
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container after new search
  phoneContainer.textContent = "";

  // display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

// console.log('is show all', isShowAll);







  // display only first 12 phones if not show all
  if(!isShowAll){
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    // 2. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-gray-100 p-4 shadow-xl";
    // 3.set innerHTML
    phoneCard.innerHTML = `
    <figure>
        <img
        src="${phone.image}"
        alt="Apple"
        />
    </figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}"!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `;
    // 4.appendChild
    phoneContainer.appendChild(phoneCard);
  });
  //   hide loading spinner
  toggleLoadingSpinner(false)
};






const handleShowDetail = async (id) => {
    // console.log('object', id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
   const phone = data.data;
    showPhoneDetails(phone)
}





// modal show phone details
const showPhoneDetails = (phone) =>{
  console.log(phone);

  const phoneName = document.getElementById('show-detail-phone-name')
  phoneName.innerText = phone.name
  const showDetailContainer = document.getElementById("show-detail-container")
  showDetailContainer.innerHTML = `
  <img src ="${phone.image}" alt="" />
  <p><span>ChipSet:</span>${phone?.mainFeatures?.chipSet}</p>
  <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span>Memory:</span>${phone?.mainFeatures?.memory}</p>
  <p><span>Display:</span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>Sensors:</span>${phone?.mainFeatures?.sensors}</p>
  <p><span>Bluetooth:</span>${phone?.others?.Bluetooth}</p>
  <p><span>GPS::</span>${phone?.others?.GPS || 'No GPS Available'}</p>
  <p><span>WLAN:</span>${phone?.others?.WLAN || "No Wlan Available"}</p>
  <p><span>ReleaseDate:</span>${phone?.releaseDate}</p>
  <p><span>Slug:</span>${phone?.slug}</p>
  `
  // show the modal
  show_details_modal.showModal()
}





// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
};





// another search button recap
// const handleSearch2 = () => {
//   toggleLoadingSpinner(true);
//   const searchField = document.getElementById("search-field2");
//   const searchText = searchField.value;
//   loadPhone(searchText);
// };





// loading section
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
};





// handle show All
const handleShowAll = () => {
    handleSearch(true)
}

loadPhone();
