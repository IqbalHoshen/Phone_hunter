const loadPhone = async (searchValue, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
  const data = await res.json();
  const phone = data.data;
  // console.log(phone);
  displayphone(phone, isShowAll);
}

const displayphone = (phone, isShowAll) => {

  const phoneContainar = document.getElementById('cardId');
  phoneContainar.textContent = '';

  const showallver = document.getElementById('showAllButton');

  if (phone.length > 12 && !isShowAll) {
    showallver.classList.remove('hidden')
  }
  else {
    showallver.classList.add('hidden')
  }

  if (!isShowAll) {
    phone = phone.slice(0, 12);
  }


  phone.forEach(element => {
    const phonecard = document.createElement('div');
    phonecard.classList = 'card w-96 bg-base-100 shadow-xl';
    phonecard.innerHTML = `
        
        <figure class="px-10 pt-10"> 
          <img src="${element.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="">${element.brand}</h2>
          <p>${element.phone_name}</p>
          <div class="card-actions">
            <button onclick="handlePhoneDetails('${element.slug}')" class="btn btn-primary" >Show Details</button>
          </div>
      </div>
`
    phoneContainar.appendChild(phonecard);
  });
  loadingProcess(false);
}

const searchPh = (isShowAll) => {
  loadingProcess(true);
  const searchId = document.getElementById('search_fild');
  const searchText = searchId.value;
  loadPhone(searchText, isShowAll);
}

const loadingProcess = (isloading) => {
  const loadingVer = document.getElementById('loading_spanner');
  if (isloading) {
    loadingVer.classList.remove('hidden')
  }
  else {
    loadingVer.classList.add('hidden')
  }
}

const handlePhoneDetails = async (phoneId) => {
  console.log(phoneId);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
  const data = await res.json();
  const phone = data.data;
  console.log(phone);
  each_details(phone)
}

const each_details = (phone) => {

  show_model_details.showModal();
  const modelDetailes = document.getElementById('show_phone_detailes');
  modelDetailes.innerHTML = `
  <img src="${phone.image}" class="place-self-center" alt="" srcset="">
  <h3 class="text-lg font-bold">${phone.name}</h3>
  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
  <h3 class="text-md font-bold">Storage : ${phone?.mainFeatures?.storage || 'Storage Detailes Not Available'}</h3>
  <h3 class="text-md font-bold">DisplaySize : ${phone?.mainFeatures?.displaySize || 'displaySize Detailes Not Available'}</h3>
  <h3 class="text-md font-bold">ChipSet : ${phone?.mainFeatures?.chipSet || 'ChipSet Detailes Not Available'}</h3>
  `
}
const showAllPhotos = () => {
  searchPh(true);
}
// loadPhone();