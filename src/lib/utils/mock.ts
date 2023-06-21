import { TemplateId, type MockData } from '$lib/types/template';

export const oop = `Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data and code. The data is in the form of fields (often known as attributes or properties), and the code is in the form of procedures (often known as methods).

A common feature of objects is that procedures (or methods) are attached to them and can access and modify the object's data fields. In this brand of OOP, there is usually a special name such as this or self used to refer to the current object. In OOP, computer programs are designed by making them out of objects that interact with one another. OOP languages are diverse, but the most popular ones are class-based, meaning that objects are instances of classes, which also determine their types.

Many of the most widely used programming languages (such as C++, Java, Python, etc.) are multi-paradigm and they support object-oriented programming to a greater or lesser degree, typically in combination with imperative, procedural programming.`;

export const spaceFlight = `Spaceflight began in the 20th century following theoretical and practical breakthroughs by Konstantin Tsiolkovsky, Robert H. Goddard, and Hermann Oberth. First successful large-scale rocket programs were initiated in the 1920s Germany by Fritz von Opel and Max Valier, and eventually in Nazi Germany by Wernher von Braun. The Soviet Union took the lead in the post-war Space Race, launching the first satellite, the first man and the first woman into orbit. The United States caught up with, and then passed, their Soviet rivals during the mid-1960s, landing the first men on the Moon in 1969. In the same period, France, the United Kingdom, Japan and China were concurrently developing more limited launch capabilities.

Following the end of the Space Race, spaceflight has been characterized by greater international cooperation, cheaper access to low Earth orbit and an expansion of commercial ventures. Interplanetary probes have visited all of the planets in the Solar System, and humans have remained in orbit for long periods aboard space stations such as Mir and the ISS. Most recently, China has emerged as the third nation with the capability to launch independent crewed missions, whilst operators in the commercial sector have developed reusable booster systems and craft launched from airborne platforms.

In 2020, SpaceX became the first commercial operator to successfully launch a crewed mission to the International Space Station with Crew Dragon Demo-2, whose name varies depending on the organization.`;

export const election = `The 2023 Nigerian presidential election was held on 25 February 2023 to elect the president and Vice President of Nigeria. Bola Tinubu, a former Governor of Lagos State and nominee of the All Progressives Congress, won the disputed election with 36.61% of the vote, 8,794,726 total votes. Runners-up were former Vice President Atiku Abubakar, Peoples Democratic Party, and former Governor of Anambra State Peter Obi, Labour Party, who both immediately contested the result; Obi claimed he won. Other federal elections, including elections to the House of Representatives and the Senate, held on the same date while state elections were scheduled to hold two weeks afterward on 11 March, but were postponed by a week and was held on 18 March. The inauguration was held on 29 May 2023.

The candidates were nominated in the party primaries conducted between 4 April and 9 June 2022. Incumbent APC President Muhammadu Buhari was term-limited and could not seek re-election for a third term. The New Nigeria Peoples Party nominated former Governor of Kano State Rabiu Kwankwaso. In the weeks after the primaries, vice presidential running mates were announced with Abubakar choosing Governor Ifeanyi Okowa. Obi selecting former Senator Yusuf Datti Baba-Ahmed, Tinubu picking Senator Kashim Shettima, and Kwankwaso choosing pastor Isaac Idahosa.`;

export const elonMusk = `Elon Reeve Musk (/ˈiːlɒn/ EE-lon; born June 28, 1971) is a business magnate and investor. He is the founder, CEO and chief engineer of SpaceX; angel investor, CEO and product architect of Tesla, Inc.; owner, CTO and chairman of Twitter; founder of the Boring Company and X Corp.; co-founder of Neuralink and OpenAI; and president of the philanthropic Musk Foundation. Musk is the wealthiest person in the world according to the Bloomberg Billionaires Index and Forbes's Real Time Billionaires list as of June 2023, primarily from his ownership stakes in Tesla and SpaceX, with an estimated net worth of around $225 billion according to Bloomberg and $235 billion according to Forbes.

Musk was born in Pretoria, South Africa, and briefly attended the University of Pretoria before moving to Canada at age 18, acquiring citizenship through his Canadian-born mother. Two years later, he matriculated at Queen's University and transferred to the University of Pennsylvania, where he received bachelor's degrees in economics and physics. He moved to California in 1995 to attend Stanford University. After two days, he dropped out and, with his brother Kimbal, co-founded the online city guide software company Zip2. In 1999, Zip2 was acquired by Compaq for $307 million and Musk co-founded X.com, a direct bank. X.com merged with Confinity in 2000 to form PayPal, which eBay acquired for $1.5 billion in 2002.

With $175.8 million, Musk founded SpaceX in 2002, a spaceflight services company. In 2004, he was an early investor in the electric vehicle manufacturer Tesla Motors, Inc. (now Tesla, Inc.). He became its chairman and product architect, assuming the position of CEO in 2008. In 2006, he helped create SolarCity, a solar energy company that was later acquired by Tesla and became Tesla Energy. In 2015, he co-founded OpenAI, a nonprofit artificial intelligence research company. The following year, he co-founded Neuralink—a neurotechnology company developing brain–computer interfaces—and the Boring Company, a tunnel construction company. Musk has also proposed a hyperloop high-speed vactrain transportation system. In 2022, his acquisition of Twitter for $44 billion was completed.

Musk has expressed views that have made him a polarizing figure. He has been criticized for making unscientific and misleading statements, including that of spreading COVID-19 misinformation. In 2018, the U.S. Securities and Exchange Commission (SEC) sued Musk for falsely tweeting that he had secured funding for a private takeover of Tesla. Musk stepped down as chairman of Tesla and paid a $20 million fine as part of a settlement agreement with the SEC.`;

export const chatGPT = `ChatGPT is an artificial intelligence chatbot developed by OpenAI based on the company's Generative Pre-trained Transformer (GPT) series of large language models (LLMs). ChatGPT is built upon OpenAI's foundational GPT models, specifically GPT-3.5 and GPT-4, and has been fine-tuned for conversational applications using a combination of supervised and reinforcement learning techniques.

ChatGPT was launched on November 30, 2022, and gained attention for its detailed and articulate responses spanning various domains of knowledge. However, a notable drawback has been its tendency to confidently provide inaccurate information.

By January 2023, it had become the fastest-growing consumer software application in history, gaining over 100 million users and contributing to OpenAI's valuation growing to US$29 billion. Within months, other businesses accelerated competing LLM products such as Google PaLM-E, Baidu ERNIE, and Meta LLaMA.

The chatbot is operated on a freemium model. Users on the free tier have access to the GPT-3.5 model, while paid subscribers to ChatGPT Plus have limited access to the more-advanced GPT-4 model, as well as priority access to new features.`;

export const mockData: MockData = {
  [TemplateId.oop]: oop,
  [TemplateId.elonMusk]: elonMusk,
  [TemplateId.spaceFlight]: spaceFlight,
  [TemplateId.election]: election,
  [TemplateId.chatGPT]: chatGPT,
};
