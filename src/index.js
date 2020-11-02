import ref from './apiService.js';
import * as basicLightbox from 'basiclightbox';

import '../node_modules/basiclightbox/src/styles/main.scss';
import './styles.css';



ref.form.addEventListener('submit', ref.searchImage);
ref.loadMoreBtn.addEventListener('click', ref.showMore);

document.querySelector('.gallery').addEventListener('click', (event) => {
  basicLightbox.create(`
    <img width="1400" height="900" src="${event.target.dataset['name']}">
	`).show(() => console.log('lightbox now visible'))
})


