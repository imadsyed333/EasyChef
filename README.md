# Phase 3 deliverables

In this phase, you will implement the React frontend of Easy Chef and connect it to your backend server. The deliverable is a fully-functional website that is shippable, presentable, self-explanatory, smooth, and beautiful. You get to modify your P1 and P2 codes at this phase. So if there was something missing, you will be able to change it.

**Notes**

- The delivarable of this phase is a full website, which means that your frontend, backend, and UI should work together. The grading will be **independent** from the previous phases. For example, your if you received X% for UI at P1, you can receive Y% at P3, where X can be higher, lower, or equal to Y. If there was a problem with your backend, you can fix them because they will be tested again (through your frontend) at P3.
- The interviews will simulate the real-world delivery of your application to the business owner. That is, the business owner is looking for a **complete website** that has a **very smooth and bug-free UX and a beautiful UI**. Pay utmost attention to the UX, where users should be able to navigate around without any problem or any need for instructions from someone else. You definitely remember websites that you left before a minute because you could not find a page you where looking for, or parts of a button was not clickable because of a simple frontend bug. You certainly did not have any empathy for the potentially countless hours the backend and frontend engineers spent on building that website and whether other parts worked well or not. You left the website, and that was the loss of a potential customer for that business.
- In our interviews, we will not be as harsh as mentioned above, but you should expect that the marking scheme is different from a classic project and the previous phases, where the only important thing is that the code somehow works. You will lose marks is your website is incomplete (lacks some functionalities) or has major or minor UI/UX issues. Smooth UX is also about single-page experience, front-end validations, in-place error-handling, asynchronous requests, and clean re-renders; all of which offered by React.
- Your UI must give a good first impression to users. Exploring your website should be delightful for users. A basic UI that everyone can tell it is the default of a framework (e.g., bootstrap) is not delightful to explore.
- Your website should include pages. That is, even though you are building a single-page application, you should change the browser's URL accordingly so that users will be able to navigate through different places with the back/forward button or re-visit a specific page through its URL. Please refer to lecture 11 to find out about pages in React.


# Pre-populated database

Unlike last phase, you should push your database/media files to your repository. The reason is pre-existing data improves your presentation a lot. The business owner certainly does not want to navigate a blank website that contains only a couple of recipes. To showcase your project, it is suggested that you include at least 10-20 recipes with their full information (e.g., diet, cuisine, ingredients, detailed steps, comments, etc.) Obviously, your strings, images, phone numbers, etc. cannot be random sequences of characters/bytes. They must construct meaningful words/sentences in English that could be the real recipes, comments, etc. You can enter data manually, or use online APIs (recommended), or even crawl similar websites.

**Note 1:** The data does not have to be original or genuine. For example, if you show the cooking time is 40 minutes, it does not have to be a real time associated with that food. However, a blank number or something like 1 minute or 1000 minutes is obviously unacceptable.

**Note 2:** Make sure that your database/media is not too big that it would take a lot of time to clone/load.

# Pagination

As mentioned in phase 2, every API that returns a list of objects should be paginated. However, depending on your database size, you should choose your page size so that the TA can test that you implemented pagination correctly. For example, a page size of 50 when you only have 20 recipes means that the TA should create 31 new recipes to check this feature, which is impossible. You can implement pagination via regular buttons (like google search on Desktops) or through infinite scrolls. Also, different endpoints can have different page sizes.

# Submission

You must push both your frontend and backend servers to your group's repository for P3. Push two scripts as well: startup.sh and run.sh. The **startup** script should run all preparations such as creating the virtual env, pip installing all packages, migrations, npm install, etc. The **run** script should run both backend and frontend servers. The TA will clone your application and work with your frontend interface like an ordinary user and will check all the required features. It should be a fully-functional website where users interact without any help from other people. This time, there is no need for pushing documentation or Postman collections.

**Note 1:** You can very make any improvements you want to your submissions for the previous phases. You can even write them from scratch (not recommended because there is not that much time). We will not look at what you submitted for those phases and will only assess your P3 repo.

**Note 2:** Before submitting, make sure that your startup and run scripts work well on a Ubuntu (preferably 20.04) machine. The TAs will run your application on clean instances of that environment. If you have worked with another operating system, it is your absolute **responsibility** to double-check that your project works fine within the Ubuntu environment as well.

**Note 3:** You can assume that python3.10, pip and virtualenv (accessible via `python3.10 -m`), and Node.js 18 is already installed on the test machines. So do not try to install them on your startup script.


