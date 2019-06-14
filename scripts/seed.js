const { User, Comment, Post } = require('../models/models');

const Main = async () => {

  await User.destroy({ where: {} })
  await Comment.destroy({ where: {} })
  await Post.destroy({ where: {} })

// sandi
const sandi =  await User.create({
    firstname: 'Sandi',
    lastname: 'Williams',
    username:'sandi',
    password: 's',
    email: 'sandicastle@email.com',
    image: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/stock/2018/2/27/0/iStock-purple-geraniums-542945456.jpg.rend.hgtvcom.966.725.suffix/1519754224444.jpeg'
  })

  // post 1

const sandiPostOne = await Post.create({
  content: 'Yesterday I went to hiking and had such a blast. Yay :)',
  image: 'https://uiaa-web.azureedge.net/wp-content/uploads/2016/09/mountain-protection-award-conservation-1200x800-1200x700.jpg'
});

const oneilCommentOne = await Comment.create({
  content: 'Liar!! I was hiking yesterday, and I did not see you on the trail.'
})

const claudiaCommentOne = await Comment.create({
  content: 'You went without me? :( You know how much I love hiking.'
})

  // post 2

const sandiPostTwo = await Post.create({
  content: "Saw some great curtains the other day",
  image:'https://images.homedepot-static.com/productImages/92fe7d0e-27f3-4d34-b5b7-2f6908554f75/svn/bubble-gum-pink-curtains-drapes-ek5317-01-2-108g-64_1000.jpg'
});

const claudiaCommentTwo = await Comment.create({
  content: 'These? Surely you can find nicer ones somewhere else, no?'
});

const oneilCommentTwo = await Comment.create({
  content: 'They are really nice. Not my style but perfect for you.'
});


// oneil

const oneil =  await User.create({
    firstname: 'Oneil',
    lastname: 'James',
    username:'oneil',
    password: 'o',
    email: 'james-thomas@email.com',
    image: 'https://jennylakeboating.com/wp-content/uploads/2017/03/scenic-cruises.png'
  })

  // post 1

const oneilPostOne = await Post.create({
    content: 'Why does this lady keep following me?!?!',
    image: 'https://www.nps.gov/subjects/nationaltrailssystem/images/NationalScenicTrails.JPG?maxwidth=1200&autorotate=false'
  })

const claudiaCommentThree = await Comment.create({
    content: 'Maybe she just wants a hiking buddy.'
  })

const sandiCommentOne =  await Comment.create({
    content: 'Orrr she\'s a cannibal and she is hungry.'
  })

  // post 2

const oneilPostTwo = await Post.create({
    content: 'If I had a dime for every person that calls football soccer...',
    image: 'https://daily.jstor.org/wp-content/uploads/2018/06/soccer_europe_1050x700.jpg'
  })

const sandiCommentTwo = await Comment.create({
  content: 'iF i HaD A dImE fOr EvErY pErSoN tHaT cAlLs FoOtBaLl SoCcEr...'
  })

const claudiaCommentFour = await Comment.create({
    content: 'Soccer soccer soccer. Hahaha, just kidding.'
  })

// claudia

const claudia =  await User.create({
    firstname: 'Claudia',
    lastname: 'Adams',
    username:'claudia',
    password: 'c',
    email: 'ccadmas2@email.com',
    image: 'https://s3-us-west-2.amazonaws.com/davidedward/wp-content/uploads/2016/01/19183146/6888494-scenic-wallpaper.jpg'
  })

    // post 1

const claudiaPostOne = await Post.create({
    content: 'I forgot to do my homework',
    image: 'https://achieve.lausd.net/cms/lib/CA01000043/Centricity/Domain/800/high-school.jpg'
  })

const sandiCommentThree = await Comment.create({
    content: 'You always forget to do your homework!'
  })

const oneilCommentThree = await Comment.create({
    content: 'Great, homework is for nerds anyways :)'
  })

    // post 2

const claudiaPostTwo = await Post.create({
    content: 'I want to go to another reality',
    image: 'https://images.template.net/wp-content/uploads/2017/01/23230913/Surreal-Acrylic-Painting.jpg'
  })

const sandiCommentFour = await Comment.create({
    content: 'Please do, maybe you will remember to do your homework there lol.'
  })

const oneilCommentFour = await Comment.create({
    content: 'Count me in next time, I am always down to explore the world.'
  })

  // post to user
  await sandiPostOne.setUser(sandi);
  await sandiPostTwo.setUser(sandi);
  await oneilPostOne.setUser(oneil);
  await oneilPostTwo.setUser(oneil);
  await claudiaPostOne.setUser(claudia);
  await claudiaPostTwo.setUser(claudia);

  // comment to post
  await sandiCommentOne.setPost(oneilPostOne);
  await sandiCommentTwo.setPost(oneilPostTwo);
  await sandiCommentThree.setPost(claudiaPostOne);
  await sandiCommentFour.setPost(claudiaPostTwo);

  await oneilCommentOne.setPost(sandiPostOne);
  await oneilCommentTwo.setPost(sandiPostTwo);
  await oneilCommentThree.setPost(claudiaPostOne);
  await oneilCommentFour.setPost(claudiaPostTwo);

  await claudiaCommentOne.setPost(sandiPostOne);
  await claudiaCommentTwo.setPost(sandiPostTwo);
  await claudiaCommentThree.setPost(oneilPostOne);
  await claudiaCommentFour.setPost(oneilPostTwo);

  // commment to user
  await sandiCommentOne.setUser(sandi);
  await sandiCommentTwo.setUser(sandi);
  await sandiCommentThree.setUser(sandi);
  await sandiCommentFour.setUser(sandi);

  await oneilCommentOne.setUser(oneil);
  await oneilCommentTwo.setUser(oneil);
  await oneilCommentThree.setUser(oneil);
  await oneilCommentFour.setUser(oneil);

  await claudiaCommentOne.setUser(claudia);
  await claudiaCommentTwo.setUser(claudia);
  await claudiaCommentThree.setUser(claudia);
  await claudiaCommentFour.setUser(claudia);

  process.exit()

}

Main()
