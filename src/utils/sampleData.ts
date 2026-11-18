import { ReferenceTaskSpec, VivaStatementSpec, VirtualFile, TestCase, ExamSession } from '../types';

export const REFERENCE_EXAM_SESSION: ExamSession = {
  candidateName: 'NAVNEET',
  candidateId: '25BCS11102',
  username: 'cuchd_cc_253 | TIWUKE',
  ipAddress: '47.247.118.30 (Allowed for this test)',
  status: 'not_attempted',
  currentSection: 'coding',
  totalDurationSeconds: 5400, // 1 hr 30 mins (90 mins)
  remainingSeconds: 5400,     // 1 Hour 30 Minutes
  isTimerRunning: true,
  wifiStatus: 'connected',
  currentQuestionIndex: 1,
  totalQuestions: 2,
};

/**
 * Question 1: SQLite JDBC Inventory Manager (Sole Question)
 */
export const REFERENCE_QUESTION_1: ReferenceTaskSpec = {
  id: 'q1-jdbc-inventory',
  questionNumber: 1,
  title: 'Product Inventory Manager using JDBC',
  subtitle:
    'You are building a small **Product Inventory Manager** using Java and JDBC.\n\nThe application must connect to an in-memory SQLite database, store product information, retrieve individual products, and display all products.\n\nEach product contains:\n• id\n• name\n• price\n• quantity',
  requirementsHeader: 'Create the following table:',
  requirements: [
    `CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price REAL,
    quantity INTEGER
);`,
  ],
  dbConnectionString: 'jdbc:sqlite::memory:',
  constraints: [],
  sampleInput: `9
ADD 101 Laptop 55000.00 5
ADD 102 Mouse 750.50 20
GET 101
STOCK 102 15
GET 102
GET 105
LIST
STOCK 101 3
GET 101`,
  sampleOutput: `101 Laptop 55000.00 5
102 Mouse 750.50 15
NOT_FOUND
101 Laptop 55000.00 5
102 Mouse 750.50 15
101 Laptop 55000.00 3`,
};

/**
 * Question 2: Method Overloading (Compile-Time Polymorphism)
 */
export const REFERENCE_QUESTION_2: ReferenceTaskSpec = {
  id: 'q2-method-overloading',
  questionNumber: 2,
  title: 'Method Overloading in Java',
  subtitle:
    'Complete the Java program demonstrating Method Overloading (Compile-Time Polymorphism).',
  requirementsHeader: 'Your implementation must:',
  requirements: [
    '1. Create an overloaded calculateArea() method in Geometry for different geometric shapes:',
    '   • calculateArea(double radius) — returns Circle area (Math.PI * radius * radius)',
    '   • calculateArea(double length, double width) — returns Rectangle area (length * width)',
    '   • calculateArea(double base, double height, boolean isTriangle) — returns Triangle area (0.5 * base * height)',
    '2. Create an overloaded displayResult() method to format and print the calculated area:',
    '   • displayResult(String shape, double area) — prints "<shape> Area: <area with 2 decimal places>"',
    '3. If non-positive dimensions are passed, return -1.0 and print "INVALID_DIMENSIONS".',
    '4. Read inputs using Scanner in the main method and invoke the corresponding overloaded methods.',
  ],
  inputFormatHeader: 'Input Format',
  inputFormatBullets: [
    'The first line contains an integer T, the number of test queries.',
    'Each of the next T lines starts with a shape identifier ("CIRCLE", "RECTANGLE", "TRIANGLE") followed by dimension values.',
  ],
  outputFormatHeader: 'Output Format',
  outputFormatText:
    'For each query, print the shape name and its calculated area rounded to 2 decimal places.\n\nPrint format:',
  outputFormatBox: 'Shape Area: <value>',
  outputFormatNote: 'Print area with exactly two digits after the decimal point.',
  constraints: [
    '1 ≤ T ≤ 50',
    '0.0 < radius, length, width, base, height ≤ 10000.0',
    'Dimensions are non-zero positive numbers.',
  ],
  moreInfo: {
    timeLimit: '1 secs',
    memoryLimit: '1.5 GB',
    sourceLimit: '50000 Bytes',
  },
  sampleInput: `3
CIRCLE 7.0
RECTANGLE 5.0 8.0
TRIANGLE 6.0 4.0`,
  sampleOutput: `Circle Area: 153.94
Rectangle Area: 40.00
Triangle Area: 12.00`,
};

// Aliases for any legacy references
export const REFERENCE_QUESTION_TREE: ReferenceTaskSpec = REFERENCE_QUESTION_1;

/**
 * Viva Section Statement (Screenshot 00.44.44.jpeg)
 */
export const REFERENCE_VIVA_STATEMENT: VivaStatementSpec = {
  title: 'Statement',
  paragraphs: [
    'A Java Swing quiz application already works. The task is to add database support with JDBC and an H2 database, in three methods:',
    'Main must load the questions from the database and hand them to the Swing panel, with no hardcoded Question objects. showResult() must store the final score by calling saveResult(...), and the task states that no SQL may be written inside the quiz panel itself.',
    'Two things puzzle a student.',
    'First, the database hands back rows of columns, but the Swing panel expects a list of Question objects. They cannot see where one turns into the other.',
    'Second, they find it quicker to open a connection inside showResult() and run the INSERT there directly. It works and the score is saved correctly, but it breaks the rule they were given.',
    'Explain how the rows become Question objects, and why the INSERT does not belong in the quiz panel.',
    'What you need to write:',
  ],
  bulletPoints: [
    '• getConnection() — returns a JDBC connection to the H2 database',
    '• getAllQuestions() — reads the questions table and returns a List < Question >',
    '• saveResult( int score, int total) — inserts the finished result, using a PreparedStatement',
  ],
  questionsToAnswer: [
    '• Which JDBC classes are used, or the name of the database',
    '• The names of the three database methods, or the tables they use',
    '• How each row coming back from the questions table becomes a Question object',
    '• Why the quiz panel calls saveResult(...) instead of running the INSERT itself',
  ],
};

/**
 * The Sole Java Code File: Product Inventory Manager (Main.java)
 * Exact Starter Template with fill-in-the-blanks (media_1794961138202_4279b298.png, media_1794961138221_22dadcee.png, media_1794961138233_f4b4b80c.png)
 */
export const STARTER_CODE_MAIN_JAVA = `import java.io.*;
import java.sql.*;
import java.util.*;

public class Main {

    static final String DB_URL = _________________________;

    static void createTable(Connection con) throws SQLException {
        String sql =
            "CREATE TABLE products (" +
            "id INTEGER PRIMARY KEY, " +
            "name TEXT, " +
            "price REAL, " +
            "quantity INTEGER)";

        try (Statement st = _________________________) {
            _________________________;
        }
    }

    static void addProduct(
        Connection con,
        int id,
        String name,
        double price,
        int quantity
    ) throws SQLException {

        String sql =
            "INSERT INTO products(id, name, price, quantity) " +
            "VALUES (?, ?, ?, ?)";

        try (PreparedStatement ps = _________________________) {

            // Bind id, name, price, and quantity
            _________________________;
            _________________________;
            _________________________;
            _________________________;

            _________________________;
        }
    }

    static void getProduct(
        Connection con,
        int id
    ) throws SQLException {

        String sql =
            "SELECT id, name, price, quantity " +
            "FROM products WHERE id = ?";

        try (PreparedStatement ps = _________________________) {

            // Bind the product id
            _________________________;

            try (ResultSet rs = _________________________) {

                if (_________________________) {
                    System.out.printf(
                        "%d %s %.2f %d%n",
                        _________________________,
                        _________________________,
                        _________________________,
                        _________________________
                    );
                } else {
                    System.out.println("NOT_FOUND");
                }
            }
        }
    }

    static void updateStock(
        Connection con,
        int id,
        int quantity
    ) throws SQLException {

        String sql =
            "UPDATE products SET quantity = ? " +
            "WHERE id = ?";

        try (PreparedStatement ps = _________________________) {

            // Bind quantity and id
            _________________________;
            _________________________;

            _________________________;
        }
    }

    static void listProducts(
        Connection con
    ) throws SQLException {

        String sql =
            "SELECT id, name, price, quantity " +
            "FROM products ORDER BY id";

        boolean found = false;

        try (
            Statement st = _________________________;
            ResultSet rs = _________________________;
        ) {
            while (_________________________) {
                found = true;

                System.out.printf(
                    "%d %s %.2f %d%n",
                    _________________________,
                    _________________________,
                    _________________________,
                    _________________________
                );
            }

            if (!found) {
                System.out.println("EMPTY");
            }
        }
    }

    public static void main(String[] args) throws Exception {
        try (Connection con = DriverManager.getConnection(DB_URL)) {
            createTable(con);

            Scanner scanner = new Scanner(System.in);
            if (!scanner.hasNextInt()) return;

            int q = scanner.nextInt();
            for (int i = 0; i < q; i++) {
                String op = scanner.next();
                if ("ADD".equals(op)) {
                    int id = scanner.nextInt();
                    String name = scanner.next();
                    double price = scanner.nextDouble();
                    int quantity = scanner.nextInt();
                    addProduct(con, id, name, price, quantity);
                } else if ("GET".equals(op)) {
                    int id = scanner.nextInt();
                    getProduct(con, id);
                } else if ("STOCK".equals(op)) {
                    int id = scanner.nextInt();
                    int quantity = scanner.nextInt();
                    updateStock(con, id, quantity);
                } else if ("LIST".equals(op)) {
                    listProducts(con);
                }
            }
        }
    }
}
`;

export const STARTER_CODE_METHOD_OVERLOADING = `package com.practice;

import java.util.Scanner;

public class MethodOverloading {

    // TODO: Overload calculateArea for Circle (radius)
    public static double calculateArea(double radius) {
        // Complete circle area logic
        return 0.0;
    }

    // TODO: Overload calculateArea for Rectangle (length, width)
    public static double calculateArea(double length, double width) {
        // Complete rectangle area logic
        return 0.0;
    }

    // TODO: Overload calculateArea for Triangle (base, height, isTriangle)
    public static double calculateArea(double base, double height, boolean isTriangle) {
        // Complete triangle area logic
        return 0.0;
    }

    // TODO: Overload displayResult(String shape, double area)
    public static void displayResult(String shape, double area) {
        // Format to 2 decimal places
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // Invoke overloaded methods
        scanner.close();
    }
}
`;

export const REFERENCE_FILES: VirtualFile[] = [
  {
    id: 'main-java',
    path: 'ProductInventoryManager/src/main/java/Main.java',
    name: 'Main.java',
    language: 'java',
    isModified: false,
    content: STARTER_CODE_MAIN_JAVA,
    initialContent: STARTER_CODE_MAIN_JAVA,
  },
  {
    id: 'method-overloading-java',
    path: 'PolymorphismLab/src/main/java/MethodOverloading.java',
    name: 'MethodOverloading.java',
    language: 'java',
    isModified: false,
    content: STARTER_CODE_METHOD_OVERLOADING,
    initialContent: STARTER_CODE_METHOD_OVERLOADING,
  },
];

export const REFERENCE_TEST_CASES_Q1: TestCase[] = [
  {
    id: 'tc-1',
    name: 'Test Case 1',
    input: `9
ADD 101 Laptop 55000.00 5
ADD 102 Mouse 750.50 20
GET 101
STOCK 102 15
GET 102
GET 105
LIST
STOCK 101 3
GET 101`,
    expectedOutput: `101 Laptop 55000.00 5
102 Mouse 750.50 15
NOT_FOUND
101 Laptop 55000.00 5
102 Mouse 750.50 15
101 Laptop 55000.00 3`,
    status: 'idle',
  },
  {
    id: 'tc-2',
    name: 'Test Case 2',
    input: `3
ADD 201 Keyboard 1200.00 10
GET 201
GET 202`,
    expectedOutput: `201 Keyboard 1200.00 10
NOT_FOUND`,
    status: 'idle',
  },
];

export const REFERENCE_TEST_CASES_Q2: TestCase[] = [
  {
    id: 'tc-1',
    name: 'Test Case 1',
    input: `3
CIRCLE 7.0
RECTANGLE 5.0 8.0
TRIANGLE 6.0 4.0`,
    expectedOutput: `Circle Area: 153.94
Rectangle Area: 40.00
Triangle Area: 12.00`,
    status: 'idle',
  },
  {
    id: 'tc-2',
    name: 'Test Case 2',
    input: `2
CIRCLE 10.0
RECTANGLE 12.0 15.0`,
    expectedOutput: `Circle Area: 314.16
Rectangle Area: 180.00`,
    status: 'idle',
  },
];

export const REFERENCE_TEST_CASES: TestCase[] = REFERENCE_TEST_CASES_Q1;
