const getData = async () => {
    const res = await fetch('https://api.coincap.io/v2/assets');
    const data = await res.json();

    return data.data;
}

const main = async () => {
    const cryptoData = await getData();
    let currentPage = 1;
    let rows = 10;

    const displayList = (arrData, rowPerPage, page) => {
        const cryptoEl = document.querySelector('.crypto-elements');

        page--;
        
        cryptoEl.innerHTML = "";

        const start = rowPerPage * page;
        const end = start + rowPerPage;
        const paginatedData = arrData.slice(start, end);

        paginatedData.forEach((el) => {
            const postEl = document.createElement('div');
            postEl.classList.add('crypto-item');
            postEl.innerText = `${el.name}`;

            cryptoEl.appendChild(postEl);
        })
    }

    const displayPagination = (arrData, rowPerPage) => {
        const paginationEl = document.querySelector('.pagination');
        const pagesCount = Math.ceil(arrData.length / rowPerPage);

        for(let i = 0; i < pagesCount; i++)
        {
            const liEl = displayPaginationBtn(i + 1);
            paginationEl.appendChild(liEl);
        }
    }

    const displayPaginationBtn = (page) => {
        const liEl = document.createElement('li');
        liEl.classList.add('pagination-item');
        liEl.innerText = page;

        currentPage == page ? liEl.classList.add('pagination-item-active') : ""

        liEl.addEventListener('click', () => {
            currentPage = page;
            displayList(cryptoData, rows, currentPage)

            let currentItem = document.querySelector("li.pagination-item-active");
            currentItem.classList.remove("pagination-item-active");

            liEl.classList.add('pagination-item-active')
        })
        return liEl;
    }

    displayList(cryptoData, rows, currentPage);
    displayPagination(cryptoData, rows);
}

main()