import ref from './apiService.js';
import * as basicLightbox from 'basiclightbox';
import InfiniteScroll from 'infinite-scroll';

import '../node_modules/basiclightbox/src/styles/main.scss';
import './styles.css';



ref.form.addEventListener('submit', ref.searchImage);
ref.loadMoreBtn.addEventListener('click', ref.showMore);


document.querySelector('.gallery').addEventListener('click', (event) => {
  basicLightbox.create(`
    <img width="1400" height="900" src="${event.target.dataset['name']}">
	`).show(() => console.log('lightbox now visible'))
})

// infScroll.loadNextPage()
const elem = document.querySelector('.gallery');
const infScroll = new InfiniteScroll( elem, {
  // options
  path: function() {
  const pageNumber = ( this.loadCount + 1 ) * 10;
  return '/articles/P' + pageNumber;
},
  append: ref.showMore,
  history: false,
});
