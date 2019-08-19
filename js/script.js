
//Li elements for each student item is selected and stored as global variable

const lis = document.querySelectorAll(".student-item");

//itemsPerPage is also created as global variable 

const itemsPerPage = 10;

//Show itemsPerPage number of items per page depending which page are you on, and hide the other items

const showPage = (list, page) => {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage

   for (let i = 0; i < list.length; i++) {
      let item = list[i]
      if (i >= startIndex && i < endIndex) {
         item.style.display = 'block';
      } else {
         item.style.display = 'none';
      }
   }
}

//Create the pagination links depending how many pages needed

const appendPageLinks = (list) => {
   const pagesNeeded = Math.ceil(list.length / itemsPerPage);

   let paginationDiv = document.createElement('div');
   let pageDiv = document.querySelector('.page');
   paginationDiv.className = 'pagination';
   pageDiv.appendChild(paginationDiv);
   let pagesUl = document.createElement('ul');
   paginationDiv.appendChild(pagesUl);

   let pagesLinks = document.getElementsByTagName('a');

   for (let i = 0; i < pagesNeeded; i++) {
      let pagesLi = document.createElement('li');
      let pagesLink = document.createElement('a');
      pagesLink.href = '#';
      pagesLink.textContent = i + 1;
      pagesUl.appendChild(pagesLi);
      pagesLi.appendChild(pagesLink);

      if( i === 0) {
         pagesLink.className = 'active';
      }

//Eventhandlers added to the links, to call the showPage function per clicked link.

      pagesLink.addEventListener('click', (e) => {

         let clickedLink = e.target;
         let page = parseInt(clickedLink.textContent, 10);
   
         showPage(list, page);

         for (let i = 0; i < pagesLinks.length; i++) {
            let link = pagesLinks[i];
            link.className = '';
         }

         clickedLink.className = 'active';
      }) 
   }

//Default is to call showPage with the first page    

   showPage(list, 1);
 
}

//Builds up the search bar and adds the event listeners

const buildUpSearch = () => {

   const pageHeader = document.querySelector('.page-header');

   let searchDiv = document.createElement('div');

   searchDiv.className = 'student-search';
   
   let searchInput = document.createElement('input');

   searchInput.placeholder = 'Search for students...';

   let searchButton = document.createElement('button');

   searchButton.textContent = 'Search';

   searchDiv.appendChild(searchInput);

   searchDiv.appendChild(searchButton);

   pageHeader.appendChild(searchDiv);

   searchInput.addEventListener('keyup', () => {
      doSearch(searchInput);
   });

   searchButton.addEventListener('click', () => {
      doSearch(searchInput);
});

}

//Carries out the search

const doSearch = (searchInput) => {
   let searchResults = [];


      for (let i =0; i < lis.length; i++) {
         let name = lis[i].children[0].children[1].textContent;
         if (searchInput.value.length !== 0 && name.toLowerCase().includes(searchInput.value.toLowerCase())) {
            lis[i].style.display = 'block';
            searchResults.push(lis[i]);
         } else {
            lis[i].style.display = 'none';
         }
      }

      removePagination();
      removeNoMatch(); 

      if (searchResults.length > 0) {
        appendPageLinks(searchResults);
      } else if (searchInput.value.length === 0) {
         appendPageLinks(lis);
      }else {
        addNoMatchText();
      }
}

// Removes the pagination links if they exist

const removePagination = () => {

   let pageDiv = document.querySelector('.page');
   let paginationDiv = document.querySelector('.pagination');

   if (paginationDiv) {
      pageDiv.removeChild(paginationDiv);
   }
}

// Adds the no match message

const addNoMatchText = () => {

  let pageDiv = document.querySelector('.page');

  let noMatchP = document.createElement('p');
  noMatchP.className = "nomatch";
  noMatchP.textContent = "No matches found..."

  pageDiv.appendChild(noMatchP);
}

// Removes the no match message if it exists

const removeNoMatch = () => {

   if (document.querySelector('.nomatch')) {
      let noMatchP = document.querySelector('.nomatch');
      let pageDiv = document.querySelector('.page');
      pageDiv.removeChild(noMatchP);
   }
}


appendPageLinks(lis);
buildUpSearch();