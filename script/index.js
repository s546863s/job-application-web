let interviewStorage = [];
let rejectedStorage = [];
let activeFilter = 'all'

let totalElement = document.getElementById('total')
let totalJobsElement = document.getElementById('total-2')
let interviewCountElement = document.getElementById('InterviewCount')
let rejectedCountElement = document.getElementById('RejectedCount')

let allButton = document.getElementById('all_btn')
let interviewButton = document.getElementById('Interview_btn')
let rejectedButton = document.getElementById('Rejected_btn')

const mainContainer = document.querySelector('main')
const allJobsContainer = document.getElementById('all_jobs')
const filteredContainer = document.getElementById("filtered-section")
const noJobsMessage = document.getElementById("noJobs")

//Count function Here
const updateCounters = () => {
    totalElement.innerText = allJobsContainer.children.length
    totalJobsElement.innerText = allJobsContainer.children.length
    interviewCountElement.innerText = interviewStorage.length
    rejectedCountElement.innerText = rejectedStorage.length
}

updateCounters()

//button toggleStyle Here
const toggleButtonStyle = (buttonId) => {
    allButton.className = 'px-5 py-2.5 bg-white text-[#4A5568] border border-[#E2E8F0] rounded-lg font-medium text-sm cursor-pointer transition-all duration-200 hover:bg-[#F8FAFC] hover:border-[#CBD5E0] active:scale-95'
    interviewButton.className = 'px-5 py-2.5 bg-white text-[#4A5568] border border-[#E2E8F0] rounded-lg font-medium text-sm cursor-pointer transition-all duration-200 hover:bg-[#F8FAFC] hover:border-[#CBD5E0] active:scale-95'
    rejectedButton.className = 'px-5 py-2.5 bg-white text-[#4A5568] border border-[#E2E8F0] rounded-lg font-medium text-sm cursor-pointer transition-all duration-200 hover:bg-[#F8FAFC] hover:border-[#CBD5E0] active:scale-95'

    const selectedButton = document.getElementById(buttonId)
    selectedButton.className = 'px-5 py-2.5 bg-[#2563EB] text-white rounded-lg font-medium text-sm cursor-pointer transition-all duration-200 hover:bg-[#2563EB]  active:scale-95'

    activeFilter = buttonId

    if (buttonId == 'Interview_btn') {
        allJobsContainer.classList.add('hidden')
        if (interviewStorage.length == 0) {
            noJobsMessage.classList.remove('hidden')
            filteredContainer.classList.add('hidden')
        } else {
            noJobsMessage.classList.add('hidden')
            filteredContainer.classList.remove('hidden')
        }
        renderInterviewJobs()
        totalJobsElement.innerText = interviewStorage.length + ' of ' + allJobsContainer.children.length

    } else if (buttonId == 'all_btn') {
        allJobsContainer.classList.remove("hidden")
        filteredContainer.classList.add('hidden')
        noJobsMessage.classList.add("hidden")
        if (allJobsContainer.children.length === 0) {
            noJobsMessage.classList.remove("hidden")
        }
        totalJobsElement.innerText = allJobsContainer.children.length

    } else if (buttonId == 'Rejected_btn') {
        filteredContainer.classList.add('hidden')
        if (rejectedStorage.length == 0) {
            noJobsMessage.classList.remove('hidden')
            allJobsContainer.classList.add('hidden')
        } else {
            allJobsContainer.classList.add('hidden')
            noJobsMessage.classList.add('hidden')
            filteredContainer.classList.remove('hidden')
        }
        renderRejectedJobs()
        totalJobsElement.innerText = rejectedStorage.length + ' of ' + allJobsContainer.children.length
    }
}

// class Chake
const doesClassStartWith = (element, prefix) => {
    if (!element.classList) return false;
    for (let className of element.classList) {
        if (className.startsWith(prefix)) {
            return true;
        }
    }
    return false;
}

// Class name founder
const findElementByPrefix = (parent, prefix) => {
    const allElements = parent.querySelectorAll('*');
    for (let element of allElements) {
        if (element.classList) {
            for (let className of element.classList) {
                if (className.startsWith(prefix)) {
                    return element;
                }
            }
        }
    }
    return null;
}


const getTextByPrefix = (parent, prefix) => {
    const targetElement = findElementByPrefix(parent, prefix);
    return targetElement ? targetElement.innerText : '';
}

mainContainer.addEventListener('click', (event) => {
    // Interview button 
    if (doesClassStartWith(event.target, 'Interview-btn-random')) {
        console.log('Interview button clicked');
        const parentJob = event.target.closest('.bg-white.p-6.rounded-xl');
        
        if (parentJob) {
            const jobTitle = getTextByPrefix(parentJob, 'job-title-random');
            const jobName = getTextByPrefix(parentJob, 'job-name-random');
            const jobSalary = getTextByPrefix(parentJob, 'job-salary-random');
            const jobDescription = getTextByPrefix(parentJob, 'job-description-random');
            
            // job-status update
            const statusElement = findElementByPrefix(parentJob, 'job-status-random');
            if (statusElement) {
                statusElement.innerText = 'Interview';
                statusElement.className = 'px-4 py-2 bg-[#EFF6FF] rounded-lg text-[#1A2B3C] text-sm font-medium uppercase tracking-wide';
            }

            const jobInformation = {
                job_title: jobTitle, 
                job_name: jobName, 
                job_salary: jobSalary, 
                job_status: 'Interview', 
                job_description: jobDescription
            };

            const alreadyExists = interviewStorage.find(item => item.job_name == jobInformation.job_name);
            if (!alreadyExists) {
                interviewStorage.push(jobInformation);
            }

            rejectedStorage = rejectedStorage.filter(item => item.job_name != jobInformation.job_name);

            if (activeFilter == "Rejected_btn") {
                renderRejectedJobs();
            }
            updateCounters();
        }

    } 
    // Rejected button check 
    else if (doesClassStartWith(event.target, 'Rejected-btn-random')) {
        console.log('Rejected button clicked');
        const parentJob = event.target.closest('.bg-white.p-6.rounded-xl');
        
        if (parentJob) {
            const jobTitle = getTextByPrefix(parentJob, 'job-title-random');
            const jobName = getTextByPrefix(parentJob, 'job-name-random');
            const jobSalary = getTextByPrefix(parentJob, 'job-salary-random');
            const jobDescription = getTextByPrefix(parentJob, 'job-description-random');
            
            const statusElement = findElementByPrefix(parentJob, 'job-status-random');
            if (statusElement) {
                statusElement.innerText = 'Rejected';
                statusElement.className = 'px-4 py-2 bg-[#EFF6FF] rounded-lg text-[#1A2B3C] text-sm font-medium uppercase tracking-wide';
            }

            const jobInformation = {
                job_title: jobTitle, 
                job_name: jobName, 
                job_salary: jobSalary, 
                job_status: 'Rejected', 
                job_description: jobDescription
            };

            const alreadyExists = rejectedStorage.find(item => item.job_name == jobInformation.job_name);
            if (!alreadyExists) {
                rejectedStorage.push(jobInformation);
            }

            interviewStorage = interviewStorage.filter(item => item.job_name != jobInformation.job_name);

            if (activeFilter == 'Interview_btn') {
                renderInterviewJobs();
            }
            updateCounters();
        }

    } 
    // Delete button Cheack
    else if (doesClassStartWith(event.target, 'delete-item-random')) {
        const parentJob = event.target.closest('.bg-white.p-6.rounded-xl');
        if (parentJob) {
            const jobName = getTextByPrefix(parentJob, 'job-name-random');
            
            // Remove done
            interviewStorage = interviewStorage.filter(item => item.job_name != jobName);
            rejectedStorage = rejectedStorage.filter(item => item.job_name != jobName);
            
            parentJob.remove();
            
            if (activeFilter == 'Interview_btn') {
                renderInterviewJobs();
            } else if (activeFilter == 'Rejected_btn') {
                renderRejectedJobs();
            }
            
            updateCounters();
        }
    }
});

//rendering Interview
const renderInterviewJobs = () => {
    filteredContainer.innerHTML = '';

    for (const job of interviewStorage) {
        let jobCard = document.createElement('div');
        jobCard.className = 'bg-white p-6 rounded-xl border border-[#E2E8F0] flex justify-between hover:shadow-md transition-shadow duration-200';
        jobCard.innerHTML = `
            <div class="space-y-4 flex-1">
                <div>
                    <h2 class="text-[#1A2B3C] text-xl font-semibold mb-1 job-title-random-${Math.random()}">${job.job_title}</h2>
                    <p class="text-[#4A5568] text-base job-name-random-${Math.random()}">${job.job_name}</p>
                </div>
                <p class="text-[#718096] text-sm bg-[#F1F5F9] inline-block px-3 py-1 rounded-full job-salary-random-${Math.random()}">${job.job_salary}</p>
                <div class="space-y-3">
                    <button class="px-4 py-2 bg-[#EFF6FF] rounded-lg text-[#1A2B3C] text-sm font-medium uppercase tracking-wide job-status-random-${Math.random()}">${job.job_status}</button>
                    <p class="text-[#4A5568] text-base leading-relaxed job-description-random-${Math.random()}">${job.job_description}</p>
                </div>
                <div class="flex gap-3 pt-2">
                    <button class="Interview-btn-random-${Math.random()} px-5 py-2.5 border-2 border-[#059669] bg-white rounded-lg font-semibold text-sm text-[#059669] uppercase cursor-pointer transition-all duration-200 hover:bg-[#059669] hover:text-white active:scale-95">Interview</button>
                    <button class="Rejected-btn-random-${Math.random()} px-5 py-2.5 border-2 border-[#DC2626] bg-white rounded-lg font-semibold text-sm text-[#DC2626] uppercase cursor-pointer transition-all duration-200 hover:bg-[#DC2626] hover:text-white active:scale-95">Rejected</button>
                </div>
            </div>
            <div class="ml-6">
                <div class="w-10 h-10 border-2 border-[#E2E8F0] rounded-full flex justify-center items-center cursor-pointer hover:bg-[#FEE2E2] hover:border-[#FCA5A5] transition-all duration-200 group">
                    <img class="delete-item-random-${Math.random()} w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-200" src="./asstes/Delete.png" alt="Delete">
                </div>
            </div>
        `;
        filteredContainer.appendChild(jobCard);
    }
}

// rendering RejectedList
const renderRejectedJobs = () => {
    filteredContainer.innerHTML = '';

    for (const job of rejectedStorage) {
        let jobCard = document.createElement('div');
        jobCard.className = 'bg-white p-6 rounded-xl border border-[#E2E8F0] flex justify-between hover:shadow-md transition-shadow duration-200';
        jobCard.innerHTML = `
            <div class="space-y-4 flex-1">
                <div>
                    <h2 class="text-[#1A2B3C] text-xl font-semibold mb-1 job-title-random-${Math.random()}">${job.job_title}</h2>
                    <p class="text-[#4A5568] text-base job-name-random-${Math.random()}">${job.job_name}</p>
                </div>
                <p class="text-[#718096] text-sm bg-[#F1F5F9] inline-block px-3 py-1 rounded-full job-salary-random-${Math.random()}">${job.job_salary}</p>
                <div class="space-y-3">
                    <button class="px-4 py-2 bg-[#EFF6FF] rounded-lg text-[#1A2B3C] text-sm font-medium uppercase tracking-wide job-status-random-${Math.random()}">${job.job_status}</button>
                    <p class="text-[#4A5568] text-base leading-relaxed job-description-random-${Math.random()}">${job.job_description}</p>
                </div>
                <div class="flex gap-3 pt-2">
                    <button class="Interview-btn-random-${Math.random()} px-5 py-2.5 border-2 border-[#059669] bg-white rounded-lg font-semibold text-sm text-[#059669] uppercase cursor-pointer transition-all duration-200 hover:bg-[#059669] hover:text-white active:scale-95">Interview</button>
                    <button class="Rejected-btn-random-${Math.random()} px-5 py-2.5 border-2 border-[#DC2626] bg-white rounded-lg font-semibold text-sm text-[#DC2626] uppercase cursor-pointer transition-all duration-200 hover:bg-[#DC2626] hover:text-white active:scale-95">Rejected</button>
                </div>
            </div>
            <div class="ml-6">
                <div class="w-10 h-10 border-2 border-[#E2E8F0] rounded-full flex justify-center items-center cursor-pointer hover:bg-[#FEE2E2] hover:border-[#FCA5A5] transition-all duration-200 group">
                    <img class="delete-item-random-${Math.random()} w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-200" src="./asstes/Delete.png" alt="Delete">
                </div>
            </div>
        `;
        filteredContainer.appendChild(jobCard);
    }
}