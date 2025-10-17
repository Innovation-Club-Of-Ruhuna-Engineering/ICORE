import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const projectsData = [
  {
    code: 'CP-01',
    project_name: 'Development of a motorised loom with an electronic jacquard head',
    supervisors: ['Prof. Chaminda Karunasena', 'Eng. L.W. Kumara'],
    members: ['Wijewardena J.M.D', 'Madusanka G.J', 'Rajarathna W.M.C.S', 'Mihisara E.A.M'],
    first_member_reg_no: 'EG/2020/4304',
    first_member_email: 'devni.wijewardena@gmail.com',
    tags: ['Textile Machinery', 'Automation', 'Electronics', 'Manufacturing'],
  },
  {
    code: 'CP-02',
    project_name: 'Development of a small scale wave energy converter for renewable energy applications using Sri Lankan wave conditions',
    supervisors: ['Prof. Chaminda Karunasena'],
    members: ['Rathnapriya K.G.S.M.', 'Rankothge R.G.P.D.', 'Gamage R.R.', 'Sampath W.A.D.'],
    first_member_reg_no: 'EG/2020/4153',
    first_member_email: 'sadeeramandara81@gmail.com',
    tags: ['Renewable Energy', 'Wave Energy', 'Sustainable Design', 'Marine Technology'],
  },
  {
    code: 'CP-03',
    project_name: 'Experimental investigation of used oil based Biodiesel in direct injection engine',
    supervisors: ['Dr. Chithral Ambawatte'],
    members: ['Sandeepa P.I.S.', 'Kapukotuwa D.H.A.D.', 'Dayarathna K.A.P.D.T.', 'Indrajith S.M.H.A.'],
    first_member_reg_no: 'EG/2020/4192',
    first_member_email: 'Isarasandaru08@gmail.com',
    tags: ['Biodiesel', 'Engine Technology', 'Alternative Fuels', 'Experimental Analysis'],
  },
  {
    code: 'CP-04',
    project_name: 'Reduction of Hydraulic retention Time of Water-Borne Plants in Anaerobic Treatment Plants',
    supervisors: ['Dr. Chithral Ambawatte'],
    members: ['Rathnayaka R.M.P.S.', 'Jayalath S.R.', 'Bandara K.M.A.K.', 'Amarasingha A.R.P.N.S.'],
    first_member_reg_no: 'EG/2020/4160',
    first_member_email: 'pasindusangeeth999@gmail.com',
    tags: ['Water Treatment', 'Bioengineering', 'Environmental Engineering', 'Process Optimization'],
  },
  {
    code: 'CP-05',
    project_name: 'Design and fabrication of a water cooled chilled water AC system to replace a split type 12000 BTU commercial AC system',
    supervisors: ['Dr. N.K. Hettiarachchi'],
    members: ['Fernando K.D.K.', 'Rathnayaka R.M.H.M.', 'Athukorala D.C.', 'Tharaka K.T'],
    first_member_reg_no: 'EG/2020/3925',
    first_member_email: 'dinendrakaushalye@gmail.com',
    tags: ['HVAC', 'Thermal Engineering', 'Cooling Systems', 'Fabrication'],
  },
  {
    code: 'CP-06',
    project_name: 'Modification and testing of a water wheel turbine',
    supervisors: ['Dr. N.K. Hettiarachchi'],
    members: ['Rathnayake R.L.S.S', 'Chandrasiri A.H.I.N', 'Kithsiri M.G.T.G.', 'Wijesinghe G.A.R'],
    first_member_reg_no: 'EG/2020/4161',
    first_member_email: 'rathnayakesumudu001@gmail.com',
    tags: ['Hydro Power', 'Turbine Design', 'Renewable Energy', 'Testing'],
  },
  {
    code: 'CP-07',
    project_name: 'Fully automated Bottle de-pucking and turning System-BC Cream line - Hemas Holdings PLC',
    supervisors: ['Dr. N.K. Hettiarachchi'],
    members: ['Athapaththu L.A.W.M.J.C.', 'Weerasinghe P.H.R.A.P.', 'Jayasinghe S.K.', 'Balasooriya P.B.M.G.'],
    first_member_reg_no: 'EG/2020/3835',
    first_member_email: 'athapaththu.lawmjc@gmail.com',
    tags: ['Industrial Automation', 'Packaging', 'Robotics', 'Manufacturing'],
  },
  {
    code: 'CP-08',
    project_name: 'Automation of Glove Dipping Line - Ansell Textile Lanka',
    supervisors: ['Dr. Ruwan Gallage', 'Mr.Thavishka Fernando'],
    members: ['Prasadini S.H.N', 'Nayanadul G.T.M', 'Fernando M.A.S.M', 'Karunathlaka H.T.W.'],
    first_member_reg_no: 'EG/2020/4117',
    first_member_email: 'nprasadini1999@gmail.com',
    tags: ['Textile Manufacturing', 'Automation', 'Industrial Control', 'Process Automation'],
  },
  {
    code: 'CP-09',
    project_name: 'Design and Fabrication of a Crushing Machine for the Recycling of Fiberglass Boat Waste',
    supervisors: ['Dr. Ruwan Gallage', 'Dr. L.K.T Srimal', 'Dr. Ruwan Appuhamy'],
    members: ['Fernando M.M.A.', 'Bandara R.M.T.K', 'Kaushini R.M.C.', 'Muthukellum H.D.'],
    first_member_reg_no: 'EG/2020/4354',
    first_member_email: 'marcofdomobile@gmail.com',
    tags: ['Waste Recycling', 'Composite Materials', 'Machinery Design', 'Sustainability'],
  },
  {
    code: 'CP-10',
    project_name: 'Design and fabrication of semi-automated bamboo straws making machine',
    supervisors: ['Dr. Ruwan Gallage', 'Dr. L.K.T Srimal'],
    members: ['Kariyawasam P.T.M', 'Kalpage S.T', 'Priyankara D.M.D.T', 'Gamage S.J'],
    first_member_reg_no: 'EG/2020/4005',
    first_member_email: 'teenuhansi@gmail.com',
    tags: ['Sustainable Manufacturing', 'Automation', 'Eco-Friendly', 'Machinery Design'],
  },
  {
    code: 'CP-11',
    project_name: 'Modelling and optimal control of a Hybrid VTOL UAV',
    supervisors: ['Dr. Buddhika Annasiwaththa'],
    members: ['De Silva P.S.L', 'Theekshana T.M.N', 'Weerasinghe H.N', 'Pallewela P.M.C.D'],
    first_member_reg_no: 'EG/2020/3885',
    first_member_email: 'lakdinudesilva@gmail.com',
    tags: ['Drone Technology', 'Control Systems', 'Aerospace', 'Modeling'],
  },
  {
    code: 'CP-12',
    project_name: 'Development of robust controller for 1-DOF magnetic suspension system',
    supervisors: ['Dr. Buddhika Annasiwaththa'],
    members: ['Dinendra S.M.S.', 'Muthukumarana P.M.', 'Ilangarathna I.P.R.R', 'Hewawasam H.E.T.S'],
    first_member_reg_no: 'EG/2020/3900',
    first_member_email: 'salilasam2000@gmail.com',
    tags: ['Control Systems', 'Magnetic Levitation', 'Electromagnetics', 'Automation'],
  },
  {
    code: 'CP-13',
    project_name: 'Design and fabrication of Sanitary napkin packing system (improvement of the existing system) - Hemas Holdings PLC',
    supervisors: ['Dr. K.T.K.M. De Silva', 'Dr. K.C Wickramasinghe'],
    members: ['Walpitagamage K.C', 'Givinda W.A.D.', 'Chandrathilaka N.R.D', 'Karunarathna Y.E.M.M.G.C'],
    first_member_reg_no: 'EG/2020/4259',
    first_member_email: 'chirawalpitagamage@gmail.com',
    tags: ['Packaging Machinery', 'Industrial Automation', 'Manufacturing', 'Process Design'],
  },
  {
    code: 'CP-14',
    project_name: 'Design and fabrication of a waste pen components segregation machine - Atlas Axillia Co. (Pvt) Ltd',
    supervisors: ['Dr. K.T.K.M. De Silva'],
    members: ['Chamindu J.S.D.S', 'Weerasinghe H.A.A.R', 'Bogamuwa K.M.T.A', 'Thilakarathna K.H.P.W.'],
    first_member_reg_no: 'EG/2020/3859',
    first_member_email: 'Surenchamindu98@gmail.com',
    tags: ['Waste Management', 'Sorting Technology', 'Automated Segregation', 'Sustainability'],
  },
  {
    code: 'CP-15',
    project_name: 'Design and fabrication of reusable pen assembling and dispensing unit - Atlas Axillia Co. (Pvt) Ltd',
    supervisors: ['Dr. K.T.K.M. De Silva'],
    members: ['Wijayarathne I.A', 'Thilanka H.W', 'Kodithuwakku K.K.S.B', 'Bandara W.B.M.N'],
    first_member_reg_no: 'EG/2020/4288',
    first_member_email: 'ama7wijayaratne@gmail.com',
    tags: ['Assembly Line', 'Automation', 'Manufacturing', 'Precision Engineering'],
  },
  {
    code: 'CP-16',
    project_name: 'Computational Analysis of Rubber Heating and Cooling Processes to determine the Curing Cycle of different rubber geometries',
    supervisors: ['Dr. P.R.D Weerasooriya', 'Dr K.J.C Kumara'],
    members: ['Chandrasena P.A.N.A', 'Yasarathna B.D.I.E', 'De Silva H.P.C.', 'Lakshan N.P.D'],
    first_member_reg_no: 'EG/2020/4313',
    first_member_email: 'nipunavishka22021@gmail.com',
    tags: ['Material Science', 'Thermal Analysis', 'Rubber Processing', 'Computational Modeling'],
  },
  {
    code: 'CP-17',
    project_name: 'Design and Fabrication of an Automated Latex Dipping Tank for Sample Preparation',
    supervisors: ['Dr. P.R.D Weerasooriya', 'Dr. Y. S. K. De Silva'],
    members: ['Fernando D.N.M', 'Dissanayake D.M.A.P.', 'Senanayake M.D', 'Senareath M.D.M.K'],
    first_member_reg_no: 'EG/2020/3924',
    first_member_email: 'nawomabhee22@gmail.com',
    tags: ['Latex Technology', 'Automation', 'Material Processing', 'Manufacturing'],
  },
  {
    code: 'CP-18',
    project_name: 'Design and Fabrication of a solar powered Air dryer for turmeric drying',
    supervisors: ['Ms. T.K.K.S. Pathmasiri', 'Dr. K.T.K.M. De Silva'],
    members: ['Dewanthi J.M.H.B.', 'Pathiraja P.W.A.W.', 'Tharaka A.L.K.', 'Kumara U.G.A.S.'],
    first_member_reg_no: 'EG/2020/3889',
    first_member_email: 'bhagya.dewanthi@gmail.com',
    tags: ['Solar Energy', 'Food Processing', 'Thermal Design', 'Sustainable Technology'],
  },
  {
    code: 'CP-19',
    project_name: 'Development and Characterization of High-Strength Composite Panels for Fishing Boat Repair under Marine Conditions',
    supervisors: ['Ms. T.K.K.S. Pathmasiri', 'Dr. K.T.K.M. De Silva'],
    members: ['Jayaweera J.M.S.T.', 'Arachchi P.P.M.', 'Abeywickrama A.I.', 'Chanika I.P.P.'],
    first_member_reg_no: 'EG/2020/3997',
    first_member_email: 'shashinithaksara@gmail.com',
    tags: ['Composite Materials', 'Marine Engineering', 'Material Characterization', 'Structural Design'],
  },
  {
    code: 'CP-20',
    project_name: 'Design and Fabrication an Automated Cologne Line Packaging End - Hemas Holdings PLC',
    supervisors: ['Dr. K.C Wickramasinghe', 'Dr. K.T.K.M. De Silva'],
    members: ['Kavindi K.H.A.C', 'Shalinda H.K', 'Wickramasingha W.A.U.I.S.', 'Lalith Kumar V'],
    first_member_reg_no: 'EG/2020/4367',
    first_member_email: 'kavindichathuni7@gmail.com',
    tags: ['Packaging Machinery', 'Industrial Automation', 'Manufacturing', 'End-of-Line Systems'],
  },
  {
    code: 'CP-21',
    project_name: 'Design and Development of a Portable Solar Cooker',
    supervisors: ['Dr. K.C Wickramasinghe', 'Dr. Thamali Jayawickrama'],
    members: ['Thilaka K.G.S.K.', 'Amarasingha A.K.C.M.', 'Wanasingha H.I.M.', 'Samaranayaka S.H.O.S.'],
    first_member_reg_no: 'EG/2020/4240',
    first_member_email: 'subhash.kavishan123@gmail.com',
    tags: ['Solar Energy', 'Thermal Design', 'Sustainability', 'Portable Design'],
  },
  {
    code: 'CP-22',
    project_name: 'Design and Fabrication of a Coconut paring machine - Adamjee Lukmanjee Exports (Pvt) Ltd',
    supervisors: ['Dr. Y. S. K. De Silva', 'Dr. K.T.K.M. De Silva'],
    members: ['Madurashmi U.D.C.K.', 'Kais K.M', 'Weerasinghe R.W.A.S.N.', 'Wijerathna S.K.B.P.M.'],
    first_member_reg_no: 'EG/2020/4057',
    first_member_email: 'chathurimadurashmi194@gmail.com',
    tags: ['Food Processing', 'Agricultural Machinery', 'Automation', 'Manufacturing'],
  },
  {
    code: 'CP-23',
    project_name: 'Design and Development of an Electrolysis Stack to Generate Green Hydrogen Using Solar Power',
    supervisors: ['Dr. Y. S. K. De Silva', 'Dr K.J.C Kumara'],
    members: ['Kularathna H.K.D.C.H', 'Ranaweera M.P.S.I', 'Rangana W.A.D', 'Madhusankha W.P'],
    first_member_reg_no: 'EG/2020/4028',
    first_member_email: 'kularathnachalana@gmail.com',
    tags: ['Green Hydrogen', 'Renewable Energy', 'Solar Power', 'Clean Energy'],
  },
  {
    code: 'CP-24',
    project_name: 'Automation of terminal block assembly - Ante LECO Metering Company (Pvt) Ltd',
    supervisors: ['Mr. H.M. Supun Sanjaya', 'Dr K.J.C Kumara'],
    members: ['Bogamuwa K.M.T.A.', 'De Silva. H. T. U.C.', 'Viduranga H.A.C.', 'Wickramathanthri C.S'],
    first_member_reg_no: 'EG/2020/3856',
    first_member_email: 'thiwangaab345@gmail.com',
    tags: ['Assembly Automation', 'Electronics Manufacturing', 'Industrial Robotics', 'Precision Engineering'],
  },
  {
    code: 'CP-25',
    project_name: 'Design and development of an automated sticker pasting system for polybags',
    supervisors: ['Ms. M.S.D. Nimali'],
    members: ['Fernando W.W.J.P.T.D', 'Rupasinghe R.A.N.P.', 'Pahalagama P.R.H.D.', 'Jayasiri R.M..L'],
    first_member_reg_no: 'EG/2020/3933',
    first_member_email: 'tharushikadeshappriya@gmail.com',
    tags: ['Packaging Automation', 'Label Application', 'Manufacturing', 'Industrial Automation'],
  },
];

function generatePassword(email: string, regNumber: string): string {
  // Simple pattern: first part of email + last 4 digits of reg number
  const emailPart = email.split('@')[0].substring(0, 6);
  const regPart = regNumber.split('/').pop(); // Get the last part after /
  return `${emailPart}@${regPart}`;
}

async function main() {
  console.log('Starting seed with 25 projects and users...');

  const credentialsList: { code: string; email: string; password: string; username: string }[] = [];

  try {
    for (const groupData of projectsData) {
      console.log(`\n========== Creating project ${groupData.code} ==========`);

      // Generate password for first member
      const plainPassword = generatePassword(
        groupData.first_member_email,
        groupData.first_member_reg_no,
      );
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      const firstMemberName = groupData.members[0].split(' ');

      // Create first member as user
      const user = await prisma.user.create({
        data: {
          email: groupData.first_member_email,
          username: groupData.first_member_email.split('@')[0],
          password: hashedPassword,
          firstName: firstMemberName[0],
          lastName: firstMemberName[firstMemberName.length - 1],
          contactNumber: `+94${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          gender: 'Not Specified',
          department: 'DMME',
          batch: '2020',
          regNumber: groupData.first_member_reg_no,
          role: 'GENERAL',
          status: 'ACTIVE',
        },
      });

      console.log(`✓ User created: ${user.email} (${user.regNumber})`);

      // Store credentials for later reference
      credentialsList.push({
        code: groupData.code,
        email: groupData.first_member_email,
        username: user.username,
        password: plainPassword,
      });

      // Create project
      const project = await prisma.project.create({
        data: {
          name: groupData.project_name,
          description: groupData.project_name,
          type: 'FYP',
          startDate: new Date('2024-01-15'),
          endDate: new Date('2024-06-30'),
          tags: groupData.tags,
          ownerId: user.id,
          isVisible: false,
          status: 'ACTIVE',
          technologies: [],
          references: [],
          papers: [],
          photos: [],
          documents: [],
        },
      });

      console.log(`✓ Project created: ${project.name}`);

      // Add first user as project leader
      await prisma.member.create({
        data: {
          projectId: project.id,
          userId: user.id,
          role: 'LEADER',
        },
      });

      console.log(`✓ ${user.firstName} added as LEADER`);

      // Add supervisors as guest members with SUPERVISOR role
      for (let i = 0; i < groupData.supervisors.length; i++) {
        const supervisorName = groupData.supervisors[i];

        await prisma.guestMember.create({
          data: {
            name: supervisorName,
            email: `${groupData.code}-supervisor${i}@example.com`,
            projectId: project.id,
            role: 'SUPERVISOR',
          },
        });

        console.log(`✓ ${supervisorName} added as GUEST SUPERVISOR`);
      }

      // Add other members as guest members
      for (let i = 1; i < groupData.members.length; i++) {
        const memberName = groupData.members[i];

        await prisma.guestMember.create({
          data: {
            name: memberName,
            email: `${groupData.code}-member${i}@example.com`,
            projectId: project.id,
            role: 'MEMBER',
          },
        });

        console.log(`✓ ${memberName} added as GUEST MEMBER`);
      }

      console.log(`\n✅ Project ${groupData.code} completed with ${groupData.supervisors.length} supervisor(s), ${groupData.members.length} member(s)`);
    }

    console.log('\n\n========== SEED COMPLETED SUCCESSFULLY ==========');
    console.log(`✓ Created 25 projects with all members\n`);

    // Print credentials
    console.log('========== USER CREDENTIALS ==========\n');
    credentialsList.forEach((cred) => {
      console.log(`Code: ${cred.code}`);
      console.log(`Email: ${cred.email}`);
      console.log(`Username: ${cred.username}`);
      console.log(`Password: ${cred.password}`);
      console.log('---');
    });
  } catch (error) {
    console.error('Seed failed:', error);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Fatal error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });