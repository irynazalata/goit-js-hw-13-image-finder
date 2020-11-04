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

const ref = {
  TOKEN: '18931614-e34c06c7127746f74346ed387',
  page: 1,
  loadMoreBtn: document.querySelector('.load-btn'),
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loading: document.querySelector('.loading'),

  searchImage(event) {
    event.preventDefault();
    // Функціонал для кнопки Load More
    // ref.loadMoreBtn.classList.add('is-hidden');
    ref.page = 1;
    ref.gallery.innerHTML = '';
    ref.renderImages(event.target.query.value);
  },

  renderImages(search) {
    setTimeout(() => {
      fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${search}&page=${ref.page}&per_page=12&key=${ref.TOKEN}`)
      .then(response => response.json())
        .then(data => {
        ref.loading.classList.remove('show');
          if (data.hits.length > 0) {
          // Функціонал для кнопки Load More
          // ref.loadMoreBtn.classList.remove('is-hidden')
          data.hits.forEach(el => ref.gallery.insertAdjacentHTML('beforeend', `${imageTemplate(el)}`));
          if (ref.gallery.children.length > 12) {
            const { scrollTop, clientHeight } = document.documentElement;
              window.scrollTo({
              top: (scrollTop + clientHeight),
              behavior: 'smooth'
            })
          }
        } else error('Such images are not found')
        // Функціонал для кнопки Load More
        //  window.scrollTo({
        //   top: document.documentElement.offsetHeight,
        //   behavior: 'smooth'
        // })
      })
    }, 100);
  },

  showMore() {
    ref.page += 1;
    ref.renderImages(ref.form.query.value);
  },
}

export default ref