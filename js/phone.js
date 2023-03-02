const loadPhones= async(searchText,dataLimit)=>{
     const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res= await fetch(url) ;
    const data = await res.json();
    displayPhones(data.data,dataLimit);
}


// load card 

const displayPhones=(phones,dataLimit)=>{
    const phoneContainer=document.getElementById('phone-container');
    phoneContainer.innerText='';
    // display20 phones only
    const showAll=document.getElementById('show-alll')
    if(dataLimit && phones.length > 10){
    phones=phones.slice(0,10);

    showAll.classList.remove('d-none');
    }
    else{

    showAll.classList.add('d-none');
    }
    // display no phones found
    const noPhone=document.getElementById("no-found-message")
    if(phones.length===0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    // display all phones
    phones.forEach(phone=>{
        const phonesDiv=document.createElement('div');
        phonesDiv.classList.add('col');
        console.log(phone);
        phonesDiv.innerHTML=`
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">${phone.slug}</p>
          <button onclick="loadDetails('${phone.slug})" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#buttonmodalDetail">Show Details</button>

        </div>
      </div>`
      phoneContainer.appendChild(phonesDiv);
  
    });
    // phone spinner or loader
    toggleSpinner(false);
}
const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField=document.getElementById("search-field");
   const searchText=searchField.value;
   loadPhones(searchText,dataLimit);

}
//  handle search button click
document.getElementById('btn-search').addEventListener("click",function(){
    processSearch(10);
})
// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress',function(e){
    if(e.key ==='Enter'){
        processSearch(10); 

    }
});
const toggleSpinner =isLoading =>{
    const loaderSection =document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}
document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch();
})
// details
const loadDetails=async id=>{
    const url=` https://openapi.programming-hero.com/api/phone/${id}`;
    const res=await fetch(url);
    const data= await res.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails= phone =>{
    console.log(phone);
    const modalTitle=document.getElementById('buttonmodalDetail');
    modalTitle.innerText=phone.name;
    const phoneDetails=document.getElementById('phone-details');
    phoneDetails.innerHTML=`
    <p> reasle:${phone.releaseDate}</p>;`

}
loadPhones('phone');