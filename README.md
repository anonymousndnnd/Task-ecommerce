# Next.js E-Commerce Assignment

->Name:Saurav Kumar
->Submisiion Date: 29/10/25
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    🧩 Project Overview
      1. Talanton Ecommerce is a full-stack Next.js web application that provides a complete online shopping experience
         with separate sections for users and administrators.
      
      2. The platform allows users (customers) to:
            -> Browse and view all available products listed by the admin.
            -> Explore detailed product information in a clean, modern interface.
            -> Add products to their wishlist (feature currently under development).
            -> Enjoy a smooth and responsive browsing experience on all devices.
    
      3. The Admin Dashboard is a secure, restricted area accessible only to authorized admins.
          Admins can:
            -> Add new products to the catalog.
            -> Edit or customize existing product details (title, description, price, image, etc.).
            -> Delete products that are no longer needed.
            -> View all updates reflected instantly on the main user-facing product page.
    
      4. The project maintains a clear separation of roles — customers can only browse and wishlist,
         while admins manage the product database securely.
    
      5. Built using modern tools and frameworks, the application ensures high performance, security, and scalability.
    
        🧰 Technologies Used
          Category	  |   Technology
          ---------------------------
          Framework	      Next.js (App Router)
          Language	      TypeScript
          ORM	            Prisma
          Database	      MongoDB
          Styling	        Tailwind CSS
          HTTP Client	    Axios
          Icons	          Lucide-React
          Authentication	Cookie-based Session Management
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    🧩 Project Setup steps
    --------------------------
    ### Prerequisites
    - Node.js 18+ 
    - npm or yarn
    
    ### Setup Steps
    1. Clone the repository:
    ```bash
       git clone https://github.com/anonymousndnnd/Task-ecommerce.git
       cd REPO_NAME
    ```
    
    2. Install dependencies:
    ```bash
       npm install
    ```
    
    3. Set up environment variables:
       - Copy `.env.example` to `.env.local`
       - Update the values as needed
    
    4. [If using MongoDB] Set up database:
       - Create a MongoDB database
       - Add connection string to `.env.local`
    
    5. Run the development server:
    ```bash
       npm run dev
    ```
    6. Open [http://localhost:3000](http://localhost:3000)

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  🧩 Rendering Strategies Explained

  1. Home Page — Incremental Static Regeneration (ISR)
     -------------------------------------------------
      The home page, which displays the list of all available products, is rendered using Incremental Static Regeneration (ISR).
     
      ~ Why ISR?
        -> It combines the speed of Static Site Generation (SSG) with the flexibility of automatic background updates.
        -> The page is pre-rendered at build time and revalidated automatically after a fixed interval (e.g., every few seconds or minutes).
      
      ~ Benefit:
      -> Users get fast load times since the page is served statically.
      -> Any new products added by the admin are automatically reflected after the regeneration period — no manual rebuild needed.

  2.Product Details Page (/product/[slug]) — Incremental Static Regeneration (ISR)
    ------------------------------------------------------------------------------  
      -> Each individual product page is also rendered using ISR.
      ~ Why ISR here?
        -> Product details like price, stock, and description may change periodically.
        -> ISR ensures that these updates appear on the product page after the revalidation interval, without regenerating all pages or slowing down requests.
      ~Benefit:
        -> Offers a real-time feel to product updates with great performance.
        -> Ideal balance between dynamic freshness and static speed.


  3. Admin Dashboard — Client-Side Rendering (CSR)
     ---------------------------------------------
      -> The admin dashboard uses Client-Side Rendering (CSR).
      
      ~ Why CSR?
          -> Admin pages involve frequent and real-time data changes (adding, editing, deleting products).
          -> CSR allows instant UI updates without waiting for static regeneration or server-side rendering.
          -> The data is fetched dynamically via Axios calls to /api/crud-products and other endpoints.
      
      ~Benefit:
        -> Provides a real-time and interactive experience for administrators.
        -> Any product modifications are instantly visible within the dashboard, ensuring smooth workflow for admins.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



  
