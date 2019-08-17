
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

appendPageLinks(lis);