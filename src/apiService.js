import {
  error,
  defaultModules,
} from "../node_modules/@pnotify/core/dist/PNotify.js";
import * as PNotifyDesktop from "../node_modules/@pnotify/desktop/dist/PNotifyDesktop.js";
import "../node_modules/@pnotify/core/dist/PNotify.css";
import "../node_modules/@pnotify/desktop/dist/PNotifyDesktop.css";
import '@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyDesktop, {});

import imageTemplate from '../src/imageTemplate.hbs';
// import * as InfiniteScroll from 'infinite-scroll';

const ref = {
  TOKEN: '18931614-e34c06c7127746f74346ed387',
  page: 1,
  loadMoreBtn: document.querySelector('.load-btn'),
  form: document.querySelector('#search-form'),

  searchImage(event) {
    event.preventDefault();
    ref.loadMoreBtn.classList.add('is-hidden');
    ref.page = 1;
    document.querySelector('.gallery').innerHTML = '';
    ref.renderImages(event.target.query.value);
  },

  renderImages(search) {
    fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${search}&page=${ref.page}&per_page=12&key=${ref.TOKEN}`)
      .then(response => response.json())
      .then(data => {
        if (data.hits.length > 0) {
          data.hits.forEach(el => document.querySelector('.gallery').insertAdjacentHTML('beforeend', `${imageTemplate(el)}`));
          ref.loadMoreBtn.classList.remove('is-hidden')
        } else error('Such images are not found')
        window.scrollTo({
          top: document.documentElement.offsetHeight,
          behavior: 'smooth'
        })
      })
  },

  showMore() {
    ref.page += 1;
    ref.renderImages(ref.form.query.value);
  },
}

// const elem = document.querySelector('.gallery');
// const infScroll = new InfiniteScroll(elem, {
//   path: ,
//   append: '.photo-card',
// // outlayer: instance,
// });

export default ref