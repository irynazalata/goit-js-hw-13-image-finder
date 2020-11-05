import {
  error
} from "../node_modules/@pnotify/core/dist/PNotify.js";
import "../node_modules/@pnotify/core/dist/PNotify.css";
import '@pnotify/core/dist/BrightTheme.css';

import InfiniteScroll from 'infinite-scroll';

import imageTemplate from '../src/imageTemplate.hbs';

const ref = {
  TOKEN: '18931614-e34c06c7127746f74346ed387',
  page: 1,
  loadMoreBtn: document.querySelector('.load-btn'),
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loading: document.querySelector('.loading'),
  search: '',

  searchImage(event) {
    event.preventDefault();
    // Функціонал для кнопки Load More
    // ref.loadMoreBtn.classList.add('is-hidden');
    ref.page = 1;
    ref.gallery.innerHTML = '';
    ref.renderImages(event.target.query.value);
    ref.search = event.target.query.value;
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
          }
            // Функціонал для scroll
          // else if (data.totalHits === ref.gallery.children.length && ref.gallery.children.length > 0) {
          //   error({ delay: 3500, text: 'No more images in this category' })
          // }
          else error({ delay: 3500, text: 'Such images are not found' })
        // Функціонал для кнопки Load More
        //  window.scrollTo({
        //   top: document.documentElement.offsetHeight,
        //   behavior: 'smooth'
        // })
      })
    }, 100);
  },

  // Функціонал для scroll
  // showMore() {
  //   ref.page += 1;
  //   ref.renderImages(ref.form.query.value);
  // },
}

const infScroll = new InfiniteScroll('.gallery', {
  path: function () {
    return 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=' + ref.search + '&page=' + (this.pageIndex + 1) + '&per_page=12&key=' + ref.TOKEN;
  },
  responseType: 'text',
  status: '.scroll-status',
  history: false
})

infScroll.on('load', function (response) {
  const data = JSON.parse(response)
    ref.loading.classList.add('show');
    data.hits.forEach(el => ref.gallery.insertAdjacentHTML('beforeend', `${imageTemplate(el)}`));
    const { scrollTop, clientHeight } = document.documentElement;
    window.scrollTo({
      top: (scrollTop + clientHeight),
      behavior: 'smooth'
    })
  ref.loading.classList.remove('show');
  if (data.total % 12 === this.loadCount) {
    error({ delay: 3500, text: 'No more images in this category' })
    infScroll.off
  }
})

export default ref