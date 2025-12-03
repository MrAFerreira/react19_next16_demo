import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

async function main() {
  // User data with valid passwords and images
  const userData = [
    {
      name: "Alice Smith",
      email: "alice@example.com",
      password: "Alice@2025!",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      password: "Bob@2025!",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "Charlie Brown",
      email: "charlie@example.com",
      password: "Charlie@2025!",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  // Create users using betterauth
  const users = [];
  for (const user of userData) {
    const created = await auth.api.signUpEmail({
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image,
        callbackURL: "/",
      },
    });
    // Fetch user from DB to get ID
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });
    if (dbUser) users.push(dbUser);
  }

  // More detailed posts for each user
  const postContents = [
    {
      title: "My First Post",
      content: "This is my first post about React and Next.js!",
    },
    {
      title: "Tips for Beginners",
      content: "Here are some tips for those starting with web development.",
    },
    {
      title: "Advanced Patterns",
      content: "Let's discuss advanced patterns in modern React.",
    },
  ];

  const posts = [];
  for (const user of users) {
    for (const post of postContents) {
      const createdPost = await prisma.post.create({
        data: {
          title: `${user.name}: ${post.title}`,
          content: post.content,
          published: true,
          authorId: user.id,
          createdAt: new Date(),
        },
      });
      posts.push(createdPost);
    }
  }

  // Likes: each user likes all posts except their own
  for (const user of users) {
    for (const post of posts) {
      if (post.authorId !== user.id) {
        await prisma.like.create({
          data: {
            userId: user.id,
            postId: post.id,
          },
        });
      }
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
