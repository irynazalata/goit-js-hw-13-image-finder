import imageTemplate from '../src/imageTemplate.hbs';

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
        data.hits.forEach(el => document.querySelector('.gallery').insertAdjacentHTML('beforeend', `${imageTemplate(el)}`))
        window.scrollTo({
          top: document.documentElement.offsetHeight,
          behavior: 'smooth'
        })
                ref.loadMoreBtn.classList.remove('is-hidden');
      })
  },

  showMore() {
    ref.page += 1;
    ref.renderImages(ref.form.query.value);
  },
}

export default ref