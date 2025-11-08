// animations.js
document.addEventListener('DOMContentLoaded',function() {
    // Animation 1
    const anim1 = lottie.loadAnimation({
    container: document.getElementById('lottie-1'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'animations/service-anim-1.json'
    });
    anim1.play();

    // Animation 2
    const anim2 = lottie.loadAnimation({
    container: document.getElementById('lottie-2'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'animations/service-anim-2.json'
    });
    anim2.play();

    // Animation 3
    const anim3 = lottie.loadAnimation({
    container: document.getElementById('lottie-3'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'animations/service-anim-3.json'
    });
    anim3.play();
    
    const anim4 = lottie.loadAnimation({
    container: document.getElementById('lottie-4'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'animations/service-anim-7.json'
    });
    anim4.play();

    const anim5 = lottie.loadAnimation({
    container: document.getElementById('lottie-5'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'animations/service-anim-6.json'
    });
    anim5.play();    

    const anim6 = lottie.loadAnimation({
    container: document.getElementById('lottie-6'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'animations/service-anim-4.json'
    });
    anim6.play();

    const anim7 = lottie.loadAnimation({
    container: document.getElementById('lottie-7'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'animations/service-anim-5.json'
    });
    anim7.play();


    const anim8 = lottie.loadAnimation({
    container: document.getElementById('lottie-8'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'animations/service-anim-9.json'
    });
    anim8.play();    
    
    const anim9 = lottie.loadAnimation({
    container: document.getElementById('lottie-9'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'animations/service-anim-12.json'
    });
    anim9.play();

    const anim10 = lottie.loadAnimation({
    container: document.getElementById('lottie-10'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'animations/service-anim-10.json'
    });
    anim10.play();

    const anim11 = lottie.loadAnimation({
    container: document.getElementById('lottie-11'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'animations/service-anim-11.json'
    });
    anim11.play();

    const anim12 = lottie.loadAnimation({
    container: document.getElementById('lottie-12'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'animations/service-anim-8.json'
    });
    anim12.play();
    // Example controls
    setTimeout(() => {
 // start third animation after 3 seconds
    }, 3000);
})