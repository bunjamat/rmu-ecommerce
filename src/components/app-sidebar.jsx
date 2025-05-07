"use client";

import * as React from "react";
import {
  AudioWaveform,
  BarChart,
  BookOpen,
  Bot,
  Building,
  Command,
  Frame,
  GalleryVerticalEnd,
  GraduationCap,
  Home,
  Mail,
  Map,
  Newspaper,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ROLE } from "./auth/role-based-guard";
import { useSession } from "next-auth/react";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
        {
          title: "Settings2",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

const navMain = [
  {
    title: "แดชบอร์ด",
    url: "/dashboard",
    icon: Home,
    isActive: true,
    items: [],
    roles: [
      ROLE.ADMIN,
      ROLE.SUPER_ADMIN,
      ROLE.FACULTY_ADMIN,
      ROLE.ALUMNI,
      ROLE.GUEST,
      ROLE.INSTRUCTOR,
    ],
  },
  {
    title: "จัดการผู้ใช้งาน",
    url: "/admin/users",
    icon: Users,
    roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.FACULTY_ADMIN],
    items: [
      {
        title: "ผู้ดูแลระบบ",
        url: "/admin/users/admins",
        roles: [ROLE.ADMIN],
      },
      {
        title: "ผู้บริหารคณะ",
        url: "/admin/users/faculty-admins",
        roles: [ROLE.SUPER_ADMIN],
      },
      {
        title: "อาจารย์",
        url: "/admin/users/instructors",
        roles: [ROLE.FACULTY_ADMIN],
      },
      {
        title: "ศิษย์เก่า",
        url: "/admin/users/alumni",
        roles: [ROLE.ADMIN],
      },
    ],
  },
  {
    title: "จัดการข้อมูลคณะ",
    url: "/admin/faculty",
    icon: Building,
    roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.FACULTY_ADMIN],
    items: [
      {
        title: "ข้อมูลคณะ",
        url: "/admin/faculty/info",
        roles: [ROLE.ADMIN],
      },
      {
        title: "หลักสูตร",
        url: "/admin/faculty/programs",
        roles: [ROLE.ADMIN],
      },
      {
        title: "สาขาวิชา",
        url: "/admin/faculty/departments",
        roles: [ROLE.ADMIN],
      },
    ],
  },
  {
    title: "จัดการข่าวสาร",
    url: "/admin/news",
    icon: Newspaper,
    roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.FACULTY_ADMIN],
    items: [
      {
        title: "ข่าวประชาสัมพันธ์",
        url: "/admin/news/announcements",
      },
      {
        title: "ข่าวรับสมัครงาน",
        url: "/admin/news/jobs",
      },
      {
        title: "ข่าวกิจกรรม",
        url: "/admin/news/events",
      },
    ],
  },

  {
    title: "ข้อมูลศิษย์เก่า",
    url: "/alumni",
    icon: GraduationCap,
    roles:[ROLE.GUEST, ROLE.ALUMNI, ROLE.INSTRUCTOR, ROLE.FACULTY_ADMIN, ROLE.SUPER_ADMIN, ROLE.ADMIN],
    items: [
      {
        title: "ทำเนียบศิษย์เก่า",
        url: "/alumni/directory",
        roles: [
          ROLE.ADMIN,
          ROLE.SUPER_ADMIN,
          ROLE.FACULTY_ADMIN,
          ROLE.ALUMNI,
          ROLE.GUEST,
          ROLE.INSTRUCTOR,
        ],
      },
      {
        title: "ศิษย์เก่าดีเด่น",
        url: "/alumni/outstanding",
        roles: [
          ROLE.ADMIN,
          ROLE.SUPER_ADMIN,
          ROLE.FACULTY_ADMIN,
          ROLE.ALUMNI,
          ROLE.GUEST,
          ROLE.INSTRUCTOR,
        ],
      },
      {
        title: "เครือข่ายศิษย์เก่า",
        url: "/alumni/network",
        roles: [
          ROLE.ADMIN,
          ROLE.SUPER_ADMIN,
          ROLE.FACULTY_ADMIN,
          ROLE.ALUMNI,
          ROLE.GUEST,
          ROLE.INSTRUCTOR,
        ],
      },
    ],
  },
  {
    title: "รายงานและสถิติ",
    url: "/admin/reports",
    icon: BarChart,

    items: [
      {
        title: "สถิติการมีงานทำ",
        url: "/admin/reports/employment",
      },
      {
        title: "การกระจายตัวตามภูมิภาค",
        url: "/admin/reports/distribution",
      },
      {
        title: "รายงานความพึงพอใจ",
        url: "/admin/reports/satisfaction",
      },
    ],
  },
  {
    title: "ข้อมูลการศึกษา",
    url: "/education",
    icon: BookOpen,

    items: [
      {
        title: "หลักสูตรที่เปิดสอน",
        url: "/education/programs",
      },
      {
        title: "ปฏิทินการศึกษา",
        url: "/education/calendar",
      },
    ],
  },
  {
    title: "การติดต่อ",
    url: "/contact",
    icon: Mail,
    roles: [
      ROLE.ADMIN,
      ROLE.SUPER_ADMIN,
      ROLE.FACULTY_ADMIN,
      ROLE.ALUMNI,
      ROLE.GUEST,
      ROLE.INSTRUCTOR,
    ],
    items: [
      {
        title: "ติดต่อคณะ",
        url: "/contact/faculty",
        roles:[
          ROLE.ADMIN,
          ROLE.SUPER_ADMIN,
          ROLE.FACULTY_ADMIN,
          ROLE.ALUMNI,
          ROLE.GUEST,
          ROLE.INSTRUCTOR,
        ]
      },
      {
        title: "ติดต่อสมาคมศิษย์เก่า",
        url: "/contact/association",
        roles:[
          ROLE.ADMIN,
          ROLE.SUPER_ADMIN,
          ROLE.FACULTY_ADMIN,
          ROLE.ALUMNI,
          ROLE.GUEST,
          ROLE.INSTRUCTOR,
        ]
      },
    ],
  },
];

export function AppSidebar({ ...props }) {
  const { data: session, status } = useSession();

  //ตั้งค่าบทบาทของผู้ใช้จาก session ถ้าไม่มีให้ใช้บทบาท GUEST
  const userRole = session?.user?.role || ROLE.GUEST;
  console.log("🚀 ~ AppSidebar ~ userRole:", userRole)

  // กรองเมนูตามบทบาทของผู้ใช้
  const getMenuItems = () => {
    const allMenuItems = navMain;

    return allMenuItems
      .filter((menu) => menu?.roles?.includes(userRole))
      .map((menu) => {
        // กรองซับเมนูตามบทบาทของผู้ใช้ หรือเมนูย่อย
        if (menu.items && menu.items.length > 0) {
          return {
            ...menu,
            items: menu.items.filter((subMenu) =>
              subMenu.roles?.includes(userRole)
            ),
          };
        }
        return menu;
      });
  };

  const menuItems = getMenuItems();

  

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-purple-500">
        <div className="flex items-center gap-2 px-4 font-bold text-xl text-white">
          ระบบศิษย์เก่า
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItems} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
