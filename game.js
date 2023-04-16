(function(){
  
    var Memory = {
  
      init: function(cards){
        this.$game = $(".game");
        this.$modal = $(".modal");
        this.$overlay = $(".modal-overlay");
        this.$restartButton = $("button.restart");
        this.cardsArray = $.merge(cards, cards);
        this.shuffleCards(this.cardsArray);
        this.setup();
      },
  
      shuffleCards: function(cardsArray){
        this.$cards = $(this.shuffle(this.cardsArray));
      },
  
      setup: function(){
        this.html = this.buildHTML();
        this.$game.html(this.html);
        this.$memoryCards = $(".card");
        this.paused = false;
        this.guess = null;
        this.binding();
      },
  
      binding: function(){
        this.$memoryCards.on("click", this.cardClicked);
        this.$restartButton.on("click", $.proxy(this.reset, this));
      },
      // kinda messy but hey
      cardClicked: function(){
        var _ = Memory;
        var $card = $(this);
        if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
          $card.find(".inside").addClass("picked");
          if(!_.guess){
            _.guess = $(this).attr("data-id");
          } else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
            $(".picked").addClass("matched");
            _.guess = null;
          } else {
            _.guess = null;
            _.paused = true;
            setTimeout(function(){
              $(".picked").removeClass("picked");
              Memory.paused = false;
            }, 600);
          }
          if($(".matched").length == $(".card").length){
            _.win();
          }
        }
      },
  
      win: function(){
        this.paused = true;
        setTimeout(function(){
          Memory.showModal();
          Memory.$game.fadeOut();
        }, 1000);
      },
  
      showModal: function(){
        this.$overlay.show();
        this.$modal.fadeIn("slow");
      },
  
      hideModal: function(){
        this.$overlay.hide();
        this.$modal.hide();
      },
  
      reset: function(){
        this.hideModal();
        this.shuffleCards(this.cardsArray);
        this.setup();
        this.$game.show("slow");
      },
  
      // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
      shuffle: function(array){
        var counter = array.length, temp, index;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);
            // Decrease counter by 1
            counter--;
            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
          }
          return array;
      },
  
      buildHTML: function(){
        var frag = '';
        this.$cards.each(function(k, v){
          frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
          <div class="front"><img src="'+ v.img +'"\
          alt="'+ v.name +'" /></div>\
          <div class="back"><img src="/Img/logo_transparent.png"\
          alt="Codepen" /></div></div>\
          </div>';
        });
        return frag;
      }
    };
  
    var cards = [
      {
        name: "php",
        img: "/Img/Baby Mickey Png Image - Purepng.jfif",
        id: 1,
      },
      {
        name: "css3",
        img: "/Img/11 Life Lessons My Kids Learned from SpongeBob SquarePants - Let Me Start By Saying.png",
        id: 2
      },
      {
        name: "html5",
        img: "/Img/Disney Babies Clip Art 5.jfif",
        id: 3
      },
      {
        name: "jquery",
        img: "/Img/Doraemon Pictures, Images - Page 8.gif",
        id: 4
      }, 
      {
        name: "javascript",
        img: "/Img/Grouchy Smurf (Glovey Story).jfif",
        id: 5
      },
      {
        name: "node",
        img: "/Img/Mickey is here!.jfif",
        id: 6
      },
      {
        name: "photoshop",
        img: "/Img/Kid Tom redesign by Stinkek on DeviantArt.png",
        id: 7
      },
      {
        name: "python",
        img: "/Img/Patrick bob esponja png 7.png",
        id: 8
      },
      {
        name: "rails",
        img: "/Img/Squidward Tentacles--squidward Toys and Merchandise.jfif",
        id: 9
      },
    ];
      
    Memory.init(cards);
  
  
  })();