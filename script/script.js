document.addEventListener('DOMContentLoaded', () => {

    var Pagination = {

        code: '',
    
        // --------------------
        // Utility
        // --------------------
    
        // converting initialize data
        Extend: function(data) {
            data = data || {};
            Pagination.size = data.size || 150;
            Pagination.page = data.page || 1;
            Pagination.step = data.step || 3;
        },
    
        // add pages by number (from [s] to [f])
        Add: function(s, f) {
            for (var i = s; i < f; i++) {
                Pagination.code += '<a class="pagination-link">' + i + '</a>';
            }
        },
    
        // add last page with separator
        Last: function() {
            Pagination.code += '<i>...</i><a class="pagination-link">' + Pagination.size + '</a>';
        },
    
        // add first page with separator
        First: function() {
            Pagination.code += '<a class="pagination-link">1</a><i>...</i>';
        },
    
    
    
        // --------------------
        // Handlers
        // --------------------
    
        // change page
        Click: function() {
            Pagination.page = +this.innerHTML;
            Pagination.Start();
        },
    
        // previous page
        Prev: function() {
            Pagination.page--;
            if (Pagination.page < 1) {
                Pagination.page = 1;
            }
            Pagination.Start();
        },
    
        // next page
        Next: function() {
            Pagination.page++;
            if (Pagination.page > Pagination.size) {
                Pagination.page = Pagination.size;
            }
            Pagination.Start();
        },
    
    
    
        // --------------------
        // Script
        // --------------------
    
        // binding pages
        Bind: function() {
            var a = Pagination.e.getElementsByTagName('a');
            for (var i = 0; i < a.length; i++) {
                if (+a[i].innerHTML === Pagination.page) a[i].className = 'current pagination-link';
                a[i].addEventListener('click', Pagination.Click, false);
            }
        },
    
        // write pagination
        Finish: function() {
            Pagination.e.innerHTML = Pagination.code;
            Pagination.code = '';
            Pagination.Bind();
        },
    
        // find pagination type
        Start: function() {
            if (Pagination.size < Pagination.step * 2 + 6) {
                Pagination.Add(1, Pagination.size + 1);
            }
            else if (Pagination.page < Pagination.step * 2 + 1) {
                Pagination.Add(1, Pagination.step * 2 + 4);
                Pagination.Last();
            }
            else if (Pagination.page > Pagination.size - Pagination.step * 2) {
                Pagination.First();
                Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
            }
            else {
                Pagination.First();
                Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
                Pagination.Last();
            }
            Pagination.Finish();
        },
    
    
    
        // --------------------
        // Initialization
        // --------------------
    
        // binding buttons
        Buttons: function(e) {
            var nav = e.getElementsByTagName('a');
            nav[0].addEventListener('click', Pagination.Prev, false);
            nav[1].addEventListener('click', Pagination.Next, false);
        },
    
        // create skeleton
        Create: function(e) {
    
            var html = [
                '<a class="pagination-prev pag-check">&#9668;</a>', // previous button
                '<span class="pagination-bar"></span>',  // pagination container
                '<a class="pagination-next pag-check">&#9658;</a>'  // next button
            ];
    
            e.innerHTML = html.join('');
            Pagination.e = e.getElementsByTagName('span')[0];
            Pagination.Buttons(e);
        },
    
        // init
        Init: function(e, data) {
            Pagination.Extend(data);
            Pagination.Create(e);
            Pagination.Start();
        }
    };
    
    
    
    /* * * * * * * * * * * * * * * * *
    * Initialization
    * * * * * * * * * * * * * * * * */
    
    var init = function() {
        Pagination.Init(document.getElementById('pagination'), {
            size: 200, // pages size
            page: 1,  // selected page
            step: 3   // pages before and after current
        });
    };
    
    init();
    
    const search = document.querySelector('.search'),
        cartBtn = document.getElementById('cart'),
        goodsWrapper = document.querySelector('.goods-wrapper'),
        cart = document.querySelector('.cart'),
        cardCounter = cartBtn.querySelector('.counter'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        cardVol = document.querySelectorAll('.card-vol');


    let goodsBasket = {};

    /* Данные для пагинации */
    let pagCheck = document.querySelectorAll('.pag-check'),
        pagActive = document.querySelector('.current'),
        notesOnPage = 15,
        allCard = 38;

    /* Фильтрация и сортировака */
    let sortName = document.querySelector('.filter-sort-list-name'),
        sortPrice = document.querySelector('.filter-sort-list-price'),
        filterHav = document.querySelector('.list-goods-list-having'),
        folderDefault = document.querySelector('.list-goods-list-default');
    

    /* Лоадинг */
    const loading = (nameFunction) => {
        const spiner = `<div id="spinner"><div class="spinner-loading"><div><div><div></div>
        </div><div><div></div></div><div><div></div></div><div><div></div></div></div></div></div>
        `;

        if (nameFunction === 'renderCard') {
            goodsWrapper.innerHTML = spiner;
        }

        if (nameFunction === 'renderBasket') {
            cartWrapper.innerHTML = spiner;
        }
    };

    

    /* Запрос на сервер */
    const getGoods = (handler, filter) => {
        loading(handler.name);
        fetch('./db/db.json')
        .then(response => response.json())
        .then(filter)
        .then(handler);
    };

    const goodsPage = (handler, filter, pageNumber) => {
        loading(handler.name);
        fetch('./db/db.json')
        .then(response => response.json())
        .then(filter)
        .then((goods) => {
            let notes = [];
            let start = (pageNumber-1) * notesOnPage;
            let end = start + notesOnPage;
    
            let note = goods.slice(start, end);

            notes = note;
            return notes;
        })
        .then(handler);
    };


    /* Пагинация */
    const paginationProduct = (sorting, pageNum) => {
        goodsPage(renderCard, sorting, pageNum);
        for (let item of pagCheck) {
            item.addEventListener('click', () => {
                let = newPagLinks = document.querySelectorAll('.pagination-link');
                pagLinks = newPagLinks;
    
                let = newPagActive = document.querySelector('.current');
                pagActive = newPagActive;
    
                let pageNum = +pagActive.innerHTML;

                console.log(Pagination);
                
                goodsPage(renderCard, sorting, pageNum);
            });
            
        };
    }


    /* Генерация карточек */
    const createCardGoods = (id, title, price, img) => {
        const card = document.createElement('div');
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';

        card.innerHTML = `<div class="card">
                            <div class="card-img-wrapper">
                                <img class="card-img-top" src="${img}" alt="">
                            </div>
                            <div class="card-body justify-content-between">
                                <a href="#" class="card-title">${title}</a>
                                <div class="card-price">${price}</div>
                                <div>
                                    <button class="card-add-cart" data-goods-id="${id}">Добавить в корзину</button>
                                    <div class="goods-count">${(goodsBasket[id] > 0) ? goodsBasket[id] : ''}</div> 
                                </div>
                            </div>
                        </div>`;
        return card; 
    };


    let goodsCountes = document.querySelectorAll('.goods-countes');

    const createCardGoodsBasket = (id, title, price, img) => {
        const card = document.createElement('div');
        card.className = 'goods';

        card.innerHTML = `<div class="goods-img-wrapper">
                                <img class="goods-img" src="${img}" alt="">

                            </div>
                            <div class="goods-description">
                                <h2 class="goods-title">${title}</h2>
                                <p class="goods-price">${price}</p>

                            </div>
                            <div class="goods-price-count">
                                <div class="goods-trigger">
                                    <button class="goods-delete" data-goods-id="${id}"></button>
                                </div>
                                <div class="goods-count">${goodsBasket[id]}</div>
                            </div>`;
        return card; 
    };


    /* Рендеры */
    const renderCard = (goods) => {
        goodsWrapper.textContent = '';

        if (goods.length) {
            goods.forEach(({ id, title, price, image}) => {
                goodsWrapper.appendChild(createCardGoods(id, title, price, image));
            });
        } else {
            goodsWrapper.textContent = '❌ Извините, мы не нашли товаров по Вашему запросу';
        }
        
    };
   
    const renderBasket = goods => {
        cartWrapper.textContent = '';

        if (goods.length) {
            goods.forEach(({ id, title, price, image}) => {
                cartWrapper.appendChild(createCardGoodsBasket(id, title, price, image));
            });
        } else {
            cartWrapper.innerHTML = '<div id="cart-empty">Ваша корзина пока пуста</div>';
        }
        
    };

    /* Калькуляция */
    const calcTotalPrice = (goods) => {

        let sum = goods.reduce((accum, item)=>{
            return accum + item.price * goodsBasket[item.id];
        },0);
        
        // for (const item of goods) {
        //     sum += item.price * goodsBasket[item.id];
        // };
        cart.querySelector('.cart-total>span').textContent = sum.toFixed(2);
    };

    const checkCount = () => {
        cardCounter.textContent = Object.keys(goodsBasket).length;
    };


    /* Фильтры и сортировки */
    const sortPages = () => {
        let activePage = document.querySelector('.current');

        if(activePage != 1) {
            let firstPage = document.querySelectorAll('.pagination-link')[0];

            firstPage.classList.add('current');
            activePage.classList.remove('current');
        }

        Pagination.page = 1;
    };

    const showCardBasket = goods => {
        const basketGoods = goods.filter(item => goodsBasket.hasOwnProperty(item.id));
        calcTotalPrice(basketGoods);
        return basketGoods;
    };

    const usulSort = (item) => item;

    const sortOnName = (item) => {
        item.sort( (prev, next) => {
            let prevLow = prev.title.toLowerCase(),
            nextLow = next.title.toLowerCase();
            if(prevLow < nextLow) return -1;
            if(prevLow > nextLow) return 1;
        })
        return item;
    };

    const sortToName = () => {
        sortPages();
        paginationProduct(sortOnName, 1);
    };

    const sortOnPrice = (item) => item.sort( (prev, next) => prev.price - next.price);

    const sortToPrice = () => {
        sortPages();
        paginationProduct(sortOnPrice, 1);
    };

    const filtrHaving = (item) => {
        return item.filter( items => items.many > 8); 
    };

    const filterToHaving = () => {
        sortPages();
        paginationProduct(filtrHaving, 1);
    };

    const defaultFilter = () => {
        sortPages();
        paginationProduct(usulSort, 1);
    };

    
    /* Работа с хранилищами */
    const getCookie = (name) => {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    const cookieQuery = get => {
        if (get) {
            if (getCookie('goodsBasket')) {
                Object.assign(goodsBasket, JSON.parse(getCookie('goodsBasket')));
                // goodsBasket = JSON.parse(getCookie('goodsBasket'));
            }
            checkCount();
        } else {
            document.cookie = `goodsBasket=${JSON.stringify(goodsBasket)}; max-age=86400e3`;
        }
    };

    
    /* События  */
    const closeCart = event => {
        const target = event.target;
        
        if(target === cart ||
            target.classList.contains('cart-close' ||
            event.keyCode === 27)) {
            cart.style.display = '';
            document.removeEventListener('keyup', closeCart);

        }
    };

    const openCart = event => {
        event.preventDefault();
        cart.style.display = 'flex';
        document.addEventListener('keydown', closeCart);
        getGoods(renderBasket, showCardBasket);
    };

    const searchGoods = event => {
        event.preventDefault();
        
        const input = event.target.elements.searchGoods;
        const inputValue = input.value.trim();
        if (inputValue !== '') {
            const searchString = new RegExp(inputValue, 'i')
            getGoods(renderCard, goods => goods.filter(item => searchString.test(item.title)));
        } else {
            search.classList.add('error');
            setTimeout( () => {
                search.classList.remove('error');
            }, 2000);
        }

        input.value = '';
    };

    const addBasket = id => {
        if (goodsBasket[id]) {
            goodsBasket[id] += 1;
        } else {
            goodsBasket[id] = 1;
        }
        checkCount();
        cookieQuery();
    };

    const removeGoods = (id) => {
        delete goodsBasket[id];
        checkCount();
        cookieQuery();
        getGoods(renderBasket, showCardBasket);
    };


    /* Хендлеры */
    const handlerGoods = event => {
        const target = event.target;

        if (target.classList.contains('card-add-wishlist')) {
            toggleWhishlist(target.dataset.goodsId, target);
        }

        if (target.classList.contains('card-add-cart')) {
            addBasket(target.dataset.goodsId);
        };
    };

    const handlerBasket = event => {
        const target = event.target;

        if (target.classList.contains('goods-add-wishlist')) {
            toggleWhishlist(target.dataset.goodsId, target);
        };

        if (target.classList.contains('goods-delete')) {
            removeGoods(target.dataset.goodsId);
        };
    };


    /*  Инициализация */    
    paginationProduct(usulSort, 1);
    cookieQuery(true);



    /* События */
    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);
    search.addEventListener('submit', searchGoods);
    goodsWrapper.addEventListener('click', handlerGoods);
    cartWrapper.addEventListener('click', handlerBasket);
    sortName.addEventListener('click', sortToName);
    sortPrice.addEventListener('click', sortToPrice);
    filterHav.addEventListener('click', filterToHaving);
    folderDefault.addEventListener('click', defaultFilter);


});





