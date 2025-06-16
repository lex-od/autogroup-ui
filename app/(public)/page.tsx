import { redirect } from 'next/navigation';

const HomePage = () => {
  redirect('/dashboard');
};

export default HomePage;

// AUTHENTICATION CHECK & CONDITIONAL RENDERING EXAMPLE

// ('use client');
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { useAuthStore } from '@/stores/auth/auth-store-provider';

// const HomePage = () => {
//   const hasHydrated = useAuthStore((state) => state.hasHydrated);
//   const isAuthenticated = useAuthStore((state) => !!state.token);
//   const unsetToken = useAuthStore((state) => state.unsetToken);

//   return (
//     <div className="grid gap-4 p-4">
//       <h1 className="text-4xl">Home</h1>
//       {hasHydrated && isAuthenticated && (
//         <div className="grid grid-flow-col justify-start gap-4">
//           <Link className="underline" href="/dashboard">
//             Go to Dashboard
//           </Link>
//         </div>
//       )}
//       {hasHydrated && (
//         <div className="grid grid-flow-col justify-start gap-4">
//           {isAuthenticated ? (
//             <Button variant="secondary" onClick={() => unsetToken()}>
//               Logout
//             </Button>
//           ) : (
//             <Link className="underline" href="/auth/login">
//               Go to Login
//             </Link>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;
