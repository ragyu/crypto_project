document.addEventListener("DOMContentLoaded", function() {
    const scrollCol = document.querySelector(".scroll-col");
    const scrollContent = document.querySelector(".scroll-content");
    const listItems = document.querySelectorAll("#list-example .list-group-item");
  
    listItems.forEach(function(item) {
      item.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        const offset = target.offsetTop - scrollContent.offsetTop;
  
        scrollCol.scrollTo({
          top: offset,
          behavior: "smooth"
        });
  
        listItems.forEach(function(item) {
          item.classList.remove("active");
        });
  
        this.classList.add("active");
      });
    });
  
    scrollContent.addEventListener("scroll", function() {
      const scrollPosition = scrollContent.scrollTop;
  
      listItems.forEach(function(item) {
        const target = document.querySelector(item.getAttribute("href"));
        const offset = target.offsetTop - scrollContent.offsetTop;
  
        if (offset <= scrollPosition && offset + target.offsetHeight > scrollPosition) {
          listItems.forEach(function(item) {
            item.classList.remove("active");
          });
  
          item.classList.add("active");
        }
      });
    });
  });