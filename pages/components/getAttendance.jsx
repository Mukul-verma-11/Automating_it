import { PrismaClient } from '@prisma/client';

export async function getStaticProps() {
  const prisma = new PrismaClient()
  const posts = await prisma.cumulative_attendance.findMany()

  return {
    props : { posts }
  }
}

const Attendance = ({ posts }) => {
  console.log(posts,"posts");
  return <div>
    {posts.map(p => <div>{p.registration_number}</div>)}
  </div>;
};

export default Attendance;
