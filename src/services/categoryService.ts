import { Category } from "../models"

export const categoryService = {
  findAllPaged: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage

    const { count, rows } = await Category.findAndCountAll({
      attributes: ['id', 'name', 'position'],
      order: [['position', 'ASC']],
      limit: perPage,
      offset // offset: offset
    })

    return {
      categories: rows,
      page, //page: page
      perPage, //perPage: perPage
      total: count
    }
  },

  findByIdWithCourses: async (id: string) => {
    const categoryWithCourse = await Category.findByPk(id, {
      attributes: ['id', 'name'],
      include: {
        association: 'courses',
        attributes: [
          'id',
          'name',
          'synopsis',
          ['thumbnail_url', 'thumbnailUrl']
        ]
      }
    })

    return categoryWithCourse
  }
}