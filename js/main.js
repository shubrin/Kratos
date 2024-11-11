$(function(){
    //s1 scrollTrigger
    let swiper = new Swiper(".mainSwiper",{
        effect:"fade",
        fadeEffect:{
            crossFade:true
        },
        //watchSlidesProgress:true,
        loop:true,
        autoplay:{
            delay:5000
        },
        speed:500,
        pagination:{
            el:".swiper-pagination",
            clickable:true,
            type:"bullets",
            renderBullet:function(index, className){
                return '<span class="' + className + '"><i></i><b></b></span>';
            }
        },
        navigation:{
            nextEl:".swiper-button-next",
            prevEl:".swiper-button-prev"
        }
    });
    
    const proSwiper = new Swiper(".proSwiper", {
        slidesPerView:3,
        spaceBetween:60,
        loop: true,
        pagination:{
            el:".swiper-pagination",
            clickable:true,
            type:"bullets",
            renderBullet:function(index, className){
                return '<span class="' + className + '"><i></i><b></b></span>';
            }
        },
        navigation:{
            nextEl:'.proSwiper .swiper-button-next',
            prevEl: 'proSwiper .swiper-button prev'
        }
    });

    const newproSwiper = new Swiper(".newproSwiper", {
        speed:500,
        slidesPerView:3,
        spaceBetween:60,
        loop:true,
        autoplay:{
            delay:3000
        },
        pagination:{
            el:".swiper-pagination",
            clickable:true,
            type:"bullets",
            renderBullet:function(index, className){
                return '<span class="' + className + '"><i></i><b></b></span>';
            }
        },
        navigation:{
            nextEl:'.proSwiper .swiper-button-next',
            prevEl: 'proSwiper .swiper-button prev'
        }
    });


    let sw=0;
    $(".top-menu ul li:last").click(function(){
        if(sw == 0){
            sw=1;
            $(this).find(".search-icon").hide();
            $(this).find(".close-icon").show();
            $(".search-area").fadeIn(200);
            $("html, body").css("overflow", "hidden");
        }else{
            sw=0;
            $(this).find(".search-icon").show();
            $(this).find(".close-icon").hide();
            $(".search-area").fadeOut(200);
            $("html, body").css("overflow", "auto");
        }
    });
    //all 
    $(".all-makers").hover(function(){
        $(".makers").stop().slideDown();
        },
        function(){
            $(".makers").stop().slideUp();
    });

    //스크롤 내릴 때 마다 section안의 자식 콘텐츠들의 애니메이션 실행
    //section 갯수만큼 반복
    $("section").each(function(){
            //각 section의 시작위치(top)값을 sectionTop변수에 저장
            let sectionTop = $(this).offset().top-300;
            //각 섹션의 bottom(끝위치)값을sectionBottom변수에 저장
            let sectionBottom = sectionTop + $(this).height();
            //만약 section영역이 viewPort안으로 들어오면
            if(sectionTop < $(window).scrollTop() && sectionBottom > $(window).scrollTop()){
                $(this).addClass("child-ani");
            }
            else{
                $(this).removeClass("child-ani");
        }
    });
    //section의 data-bg속성값에 따라 body의 배경색 변경하기
    //$section 변수에 section객체를 모두 저장
    //$section[0]="section"; ......$section[11]="section"
    const $sections = $('section'); 
    //body의 배경색을 첫번째 section의 data-bg값으로 설정   
    $('body').css('background', $sections.first().data('bg'));
    //window객체에 scroll이벤트 설정
    $(window).on('scroll', function() {
        //$section변수에 $section 배열의 값을 복사, .은 메서드 체인
        const $section = $sections
        .map(function() {
            //section 각각의 객체를 $el 변수에 저장
            const $el = $(this);
            //각 section의 영역을 rect 변수에 저장
            //this.getBoundingClientRect() : section영역의 크기와 viewport의 상대적인 위치 정보를 제공하는 메서드
            const rect = this.getBoundingClientRect();
            return { el: $el, rect: rect };
        })
        .toArray()
        .find(function(section) {
            return section.rect.bottom >= ($(window).height() * 0.5);
        });
        //viewPort화면 안에 section이 들어오면 body의 배경색을 bg속성색으로 변경
        if ($section) {
        $('body').css('background', $section.el.data('bg'));
        }
    });
     //뷰포트의 가로길이가 1280미만인 기기에서 작동함
     if($(window).width() < 1280){
        //모바일 버전 menu-icon 클릭하면 nav나타남
        $("#menu-icon").click(function(){
            $("nav").animate({
                right:0
            });
        });
        //모바일 버전 menu-icon 클릭하면 nav나타남
    }
    //모바일 버전 close-btn클릭하면 nav사라짐
    $("#close-btn").click(function(){
        $("nav").animate({
            right:"-100%"
        });
    });
});