const imageContainer = document.getElementById('image-container');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pageNum = document.getElementById('page-num');

let currentPage = 1;
let totalPages = 0;

// 加载图片
function loadImages() {
    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            totalPages = data.length;
            showImage(currentPage);
        });
}

// 显示指定页码的图片
function showImage(page) {
    imageContainer.innerHTML = `<img src="output_images/page_${page}.jpg" alt="Page ${page}">`;
    pageNum.textContent = `${page} / ${totalPages}`;
    currentPage = page;
}

// 下一页
function nextPage() {
    if (currentPage < totalPages) {
        showImage(currentPage + 1);
    }
}

// 上一页
function prevPage() {
    if (currentPage > 1) {
        showImage(currentPage - 1);
    }
}

// 事件监听器
nextButton.addEventListener('click', nextPage);
prevButton.addEventListener('click', prevPage);

// 触摸滑动
let touchStartX = 0;
let touchEndX = 0;

imageContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

imageContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) nextPage();
    if (touchEndX > touchStartX) prevPage();
}

// 键盘控制
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextPage();
    if (e.key === 'ArrowLeft') prevPage();
});

// 初始化
loadImages();
