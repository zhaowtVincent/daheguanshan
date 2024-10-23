const imageContainer = document.getElementById('image-container');
const navPrev = document.getElementById('nav-prev');
const navNext = document.getElementById('nav-next');
const pageNum = document.getElementById('page-num');

let currentPage = 1;
let totalPages = 0;
let startX, startY, endX, endY;
const minSwipeDistance = 50; // 最小滑动距离

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
navNext.addEventListener('click', nextPage);
navPrev.addEventListener('click', prevPage);

// 触摸事件
imageContainer.addEventListener('touchstart', handleTouchStart, false);
imageContainer.addEventListener('touchmove', handleTouchMove, false);
imageContainer.addEventListener('touchend', handleTouchEnd, false);

// 记录触摸开始位置
function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    startX = firstTouch.clientX;
    startY = firstTouch.clientY;
}

// 记录触摸结束位置
function handleTouchMove(event) {
    if (!startX || !startY) {
        return;
    }
    endX = event.touches[0].clientX;
    endY = event.touches[0].clientY;
}

// 处理滑动
function handleTouchEnd() {
    if (!startX || !startY || !endX || !endY) {
        return;
    }

    const diffX = startX - endX;
    const diffY = startY - endY;

    // 确保水平滑动距离大于垂直滑动距离，并且超过最小滑动距离
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
        if (diffX > 0) {
            // 向左滑动
            nextPage();
        } else {
            // 向右滑动
            prevPage();
        }
    }

    // 重置触摸坐标
    startX = startY = endX = endY = null;
}

// 键盘控制
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextPage();
    if (e.key === 'ArrowLeft') prevPage();
});

// 初始化
loadImages();
