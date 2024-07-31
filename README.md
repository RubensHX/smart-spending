# Smart Spending

Smart Spending is a modern personal finance management application built with Next.js, leveraging NextAuth v4 for authentication, Prisma for database interactions, and server actions for handling complex operations. This app helps users track their expenses, manage budgets, and gain insights into their spending habits.

## Features

- **User Authentication**: Secure user login and registration with NextAuth v4.
- **Expense Tracking**: Record and categorize personal expenses.
- **Budget Management**: Set and monitor budgets across different categories.
- **Data Insights**: Generate reports and visualizations for spending patterns.
- **Server Actions**: Efficient server-side operations with built-in support.

## Technologies Used

- **Next.js**: A React framework for server-rendered or statically-exported React apps.
- **NextAuth v4**: Authentication for Next.js applications, providing login and session management.
- **Prisma**: Modern ORM for database access, handling complex queries and data modeling.
- **Server Actions**: Custom server-side logic to handle business rules and interactions.

## Installation

To get started with Smart Spending, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/smart-spending.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd smart-spending
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```

4. **Set up environment variables**:

    Create a `.env.local` file in the root directory and add the necessary environment variables. Example:

    ```env
    DATABASE_URL="your-database-url"
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="your-secret"
    ```

    Replace `your-database-url` and `your-secret` with your actual database connection string and secret key.

5. **Run database migrations**:

    ```bash
    npx prisma migrate dev
    ```

6. **Start the development server**:

    ```bash
    npm run dev
    ```

    Open your browser and go to `http://localhost:3000` to see the app in action.

## Usage

- **Authentication**: Users can sign up, log in, and manage their accounts securely.
- **Expense Management**: Add and categorize expenses, view expense history.
- **Budget Tracking**: Set budgets and track spending against these budgets.
- **Insights**: View and analyze spending trends and generate reports.
  
## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or feedback, please reach out to [rubensh206@gmail.com](mailto:rubensh206@gmail.com).

---

Feel free to customize any part of this README to better fit your project and personal preferences!
